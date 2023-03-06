import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinks, getMeals } from '../services/apiServices';
import RecommendationCard from '../components/RecommendationCard';
import '../styles/recipeDetails.css';

export function RecipeDetails({ match, location, history }) {
  const [data, setData] = useState({});
  const [ingredientsEntries, setIngredientsEntries] = useState([]);
  const [measureEntries, setMeasureEntries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

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
    const number = 11;

    return (matchReg && matchReg[2].length === number)
      ? matchReg[2]
      : null;
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
        console.log(apiData);
        setData(apiData.drinks[0]);
      });
    // fetch das recomendações
    const numberOfRecommendations = 6;
    getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=', numberOfRecommendations)
      .then((response) => setRecommendations(response));
  }, [location.pathname, match.params]);

  const mealsOrDrinks = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))[mealsOrDrinks] : null;
  const idsInProgressRecipes = Object.keys(inProgressRecipes || {});

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
              key={ recommendation.id }
              title={ recommendation.strMeal || recommendation.strDrink }
              index={ index }
              src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
            />
          ))}
        </div>
      </div>
      {JSON.parse(localStorage.getItem('doneRecipes'))
        ?.some((doneRecipe) => Number(doneRecipe.id) === Number(match.params.id)) ? '' : (
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={
              () => history.push(`/${mealsOrDrinks}/${match.params.id}/in-progress`)
            }
          >
            Start Recipe
          </button>
        ) }
      {idsInProgressRecipes
        ?.some((idsInProgressRecipe) => idsInProgressRecipe === match.params.id) ? (
          <button
            data-testid="start-recipe-btn"
          >
            Continue Recipe
          </button>
        ) : ''}
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
