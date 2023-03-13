import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinks, getMeals } from '../services/apiServices';
import RecommendationCard from '../components/RecommendationCard';
import '../styles/recipeDetails.css';
import shareSvg from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { handleClickFavorite } from '../helpers/handleClickFavorite';

const copy = require('clipboard-copy');

export function RecipeDetails({ match, location, history }) {
  const [data, setData] = useState({});
  const [ingredientsEntries, setIngredientsEntries] = useState([]);
  const [measureEntries, setMeasureEntries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      return;
    }

    if (JSON.parse(localStorage.getItem('favoriteRecipes'))
      ?.some((favoriteRecipe) => favoriteRecipe.id === match.params.id)) {
      setIsFavorited(true);
    }
  }, [match.params.id]);

  useEffect(() => {
    const ingredients = Object.entries(data).filter(
      (entrie) => entrie[0].includes('strIngredient') && entrie[1],
    );
    setIngredientsEntries(ingredients);
    const measures = Object.entries(data).filter(
      (entrie) => entrie[0].includes('strMeasure') && entrie[1],
    );
    setMeasureEntries(measures);
  }, [data]);

  // função para pegar o id do video do youtube pra fazer o embed
  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const matchReg = url.match(regExp);

    return matchReg[2];
  }

  useEffect(() => {
    const { id } = match.params;
    if (location.pathname.includes('meals')) {
      // fetch do recipe
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((apiData) => {
          setData(apiData.meals[0]);
        });
      // fetch das recomendações
      const numberOfRecommendations = 6;
      getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', numberOfRecommendations)
        .then((response) => setRecommendations(response));
      return;
    }
    // fetch do recipe
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData.drinks[0]);
      });
    // fetch das recomendações
    const numberOfRecommendations = 6;
    getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=', numberOfRecommendations)
      .then((response) => setRecommendations(response));
  }, [location.pathname, match.params]);

  const mealsOrDrinks = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const inProgressRecipes = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))[mealsOrDrinks] : null;
  const idsInProgressRecipes = Object.keys(inProgressRecipes || {});
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : null;

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb || data.strDrinkThumb }
          alt=""
        />
        <h3 data-testid="recipe-title">{data.strMeal || data.strDrink}</h3>
        <p data-testid="recipe-category">
          {location.pathname.includes('meals') ? data.strCategory : data.strAlcoholic}
        </p>
        {ingredientsEntries.map((ingredientEntrie, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredientEntrie[0] }
          >
            {`Ingrediente ${index + 1}: `}
            {ingredientEntrie[1]}
            {' '}
            {measureEntries[index] ? measureEntries[index][1] : ''}
          </p>
        ))}
        <p data-testid="instructions">{data.strInstructions}</p>
        {data.strYoutube && <iframe
          width="853"
          height="480"
          src={ `https://www.youtube.com/embed/${getId(data.strYoutube)}` }
          title="Embedded youtube"
          data-testid="video"
        />}
        <div className="carousel">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard
              key={ recommendation.idMeal || recommendation.idDrink }
              title={ recommendation.strMeal || recommendation.strDrink }
              index={ index }
              src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
            />
          ))}
        </div>
      </div>
      {doneRecipes
        ?.some((doneRecipe) => Number(doneRecipe.id) === Number(match.params.id)) ? '' : (
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={
              () => history.push(`/${mealsOrDrinks}/${match.params.id}/in-progress`)
            }
          >
            {idsInProgressRecipes
              ?.some((idsInProgressRecipe) => idsInProgressRecipe === match.params.id)
              ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        ) }
      <button
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000${location.pathname}`);
          setIsLinkCopied(true);
        } }
      >
        <img src={ shareSvg } alt="share-icon" />
      </button>
      {isLinkCopied && <p>Link copied!</p>}
      <button
        onClick={
          () => handleClickFavorite(data, match.params.id, isFavorited, setIsFavorited)
        }
      >
        <img
          src={
            isFavorited
              ? blackHeartIcon : whiteHeartIcon
          }
          alt="favorite-icon"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
