import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareSvg from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getMealDetails, getDrinkDetails } from '../services/apiServices';
import IngredientCheckbox from '../components/IngredientCheckbox';

const copy = require('clipboard-copy');

function RecipeInProgress({ match: { params: { id } }, location }) {
  const { pathname } = location;
  const [data, setData] = useState({});
  const [ingredientsEntries, setIngredientsEntries] = useState([]);
  const [measureEntries, setMeasureEntries] = useState([]);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const [deleteItem, setDeleteItem] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const {
    idMeal = '',
    idDrink = '',
    strArea = '',
    strMealThumb = '',
    strAlcoholic = '',
    strDrinkThumb = '',
    strMeal = '',
    strDrink = '',
    strCategory = '',
    strInstructions = '',
  } = data;

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      return;
    }

    if (JSON.parse(localStorage.getItem('favoriteRecipes'))
      ?.some((favoriteRecipe) => favoriteRecipe.id === id)) {
      setIsFavorited(true);
    }
  }, [id]);

  const handleClickFavorite = () => {
    const objectToSet = {
      id: idMeal || idDrink,
      type: idMeal ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strDrinkThumb || strMealThumb,
    };
    if (isFavorited) {
      const filteredFavoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      )
        .filter((favoriteRecipe) => Number(favoriteRecipe.id)
        !== Number(id));
      if (filteredFavoriteRecipes.length === 0) {
        localStorage.removeItem('favoriteRecipes');
      } else {
        localStorage.setItem('favoriteRecipes', filteredFavoriteRecipes);
      }
      setIsFavorited(false);
    } else {
      if (localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(
            [...JSON.parse(localStorage.getItem('favoriteRecipes')), objectToSet],
          ),
        );
        return;
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify([objectToSet]));
      setIsFavorited(true);
    }
  };

  useEffect(() => {
    if (pathname.includes('meals')) {
      getMealDetails(id).then((response) => setData(response));
      setTypeOfRecipe('meals');
    } else {
      getDrinkDetails(id).then((response) => setData(response));
      setTypeOfRecipe('drinks');
    }
    const ingredients = Object.entries(data).filter(
      (entrie) => entrie[0].includes('strIngredient') && entrie[1],
    );
    setIngredientsEntries(ingredients);
    const measures = Object.entries(data).filter(
      (entrie) => entrie[0].includes('strMeasure') && entrie[1],
    );
    setMeasureEntries(measures);
  }, [data, id, pathname]);

  useEffect(() => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const idAndIngredientsUsed = { [id]: [] };
    const initialObject = {
      drinks: typeOfRecipe === 'drinks' ? idAndIngredientsUsed : {},
      meals: typeOfRecipe === 'meals' ? idAndIngredientsUsed : {},
    };
    // Se não hover nada salvo no localStorage, cria-se o localStorage com o initialObject e seta o estado
    if (typeOfRecipe !== '' && !inProgressStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialObject));
      setIngredientsUsed(initialObject[typeOfRecipe][id]);
    // Caso haja algo, mas não tenha nada referente ao ID atual, adiciona-se o array vazio [] pata o ID atual
    } else if (
      typeOfRecipe !== '' && !Object.keys(inProgressStorage[typeOfRecipe])
        ?.some((item) => item === id)
    ) {
      inProgressStorage[typeOfRecipe][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
      setIngredientsUsed(inProgressStorage[typeOfRecipe][id]);
    // Caso haja algo e tenha algo referente ao ID atual seta o estado
    } else if (
      typeOfRecipe !== '' && Object.keys(inProgressStorage[typeOfRecipe])
        ?.some((item) => item === id)
    ) {
      setIngredientsUsed(inProgressStorage[typeOfRecipe][id]);
    }
  }, [id, typeOfRecipe]);

  useEffect(() => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // Resgata o que tem salvo no localStorage de ingredientes salvos
    if (typeOfRecipe !== '' && ingredientsUsed.length !== 0) {
      inProgressStorage[typeOfRecipe][id] = ingredientsUsed;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
    }
    if (typeOfRecipe !== '' && deleteItem) {
      delete inProgressStorage[typeOfRecipe][id];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
      setDeleteItem(false);
    }
  }, [id, typeOfRecipe, ingredientsUsed, deleteItem]);

  // console.log(ingredientsEntries);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ `${strMeal || strDrink}` }
      />
      <div>
        <button
          data-testid="share-btn"
          onClick={ () => {
            copy(`http://localhost:3000${pathname.replace('/in-progress', '')}`);
            setIsLinkCopied(true);
          } }
        >
          <img src={ shareSvg } alt="share-icon" />
        </button>
        {isLinkCopied && <p>Link copied!</p>}
        <button
          type="button"
          onClick={ handleClickFavorite }
          data-testid="favorite-btn"
        >
          <img
            src={ isFavorited
              ? blackHeartIcon
              : whiteHeartIcon }
            alt="favorite-icon"
          />
        </button>
      </div>
      <h3 data-testid="recipe-title">{ strMeal || strDrink }</h3>
      <p data-testid="recipe-category">
        {strCategory}
      </p>
      {ingredientsEntries.map((ingredientEntrie, index) => (
        <IngredientCheckbox
          key={ `ingredient-${index}` }
          ingredientEntrie={ ingredientEntrie }
          measureEntries={ measureEntries }
          index={ index }
          recipeId={ id }
          ingredientsUsed={ ingredientsUsed }
          setIngredientsUsed={ setIngredientsUsed }
          isChecked={ ingredientsUsed.some((item) => item === ingredientEntrie[1]) }
          setDeleteItem={ setDeleteItem }
        />
      ))}
      <p data-testid="instructions">{strInstructions}</p>
      <Link
        to="/"
      >
        <button
          type="button"
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          // disabled={ true }
        >
          Finish Recipe
        </button>
      </Link>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
