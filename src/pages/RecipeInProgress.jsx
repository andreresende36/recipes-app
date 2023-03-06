import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import { getMealDetails, getDrinkDetails } from '../services/apiServices';

function RecipeInProgress({ match: { params: { id } }, location: { pathname } }) {
  const [data, setData] = useState({});
  const [ingredientsEntries, setIngredientsEntries] = useState([]);
  const [measureEntries, setMeasureEntries] = useState([]);
  const {
    strMealThumb,
    strDrinkThumb = '',
    strMeal = '',
    strDrink = '',
    strCategory = '',
    strInstructions = '',
  } = data;
  useEffect(() => {
    if (pathname.includes('meals')) {
      getMealDetails(id).then((response) => setData(response));
    } else {
      getDrinkDetails(id).then((response) => setData(response));
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
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ `${strMeal || strDrink}` }
      />
      <div>
        <button
          type="button"
          data-testid="share-btn"
          className="share-btn"
          onClick={ () => console.log('compartilhou') }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          className="favorite-btn"
          onClick={ () => console.log('favoritou') }
        >
          <img src={ favoriteIcon } alt="favorite icon" />
        </button>
      </div>
      <h3 data-testid="recipe-title">{ strMeal || strDrink }</h3>
      <p data-testid="recipe-category">
        {strCategory}
      </p>
      {ingredientsEntries.map((ingredientEntrie, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          key={ ingredientEntrie[0] }
        >
          <input type="checkbox" />
          {`Ingrediente ${index + 1}: `}
          {ingredientEntrie[1]}
          {' '}
          {measureEntries[index] ? measureEntries[index][1] : ''}
          <br />
        </label>
      ))}
      <p data-testid="instructions">{strInstructions}</p>
      <Link
        to="/"
      >
        <button
          type="button"
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
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
