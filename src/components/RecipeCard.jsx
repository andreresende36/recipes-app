import React from 'react';
import PropTypes from 'prop-types';
import '../styles/recipesFirstPage.css';

function RecipeCard({ recipe, index, history }) {
  const {
    strMealThumb = '',
    strDrinkThumb = '',
    strMeal = '',
    strDrink = '' } = recipe;
  return (
    <button
      data-testid={ `${index}-recipe-button` }
      className="recipe-button"
      onClick={ () => history.push(
        recipe.idMeal ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}`,
      ) }
    >
      <div
        className="recipe-card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ strMealThumb || strDrinkThumb }
          alt={ `imagem da receita ${strMeal || strDrink}` }
          data-testid={ `${index}-card-img` }
          className="recipe-img"
        />
        <span
          data-testid={ `${index}-card-name` }
          className="recipe-name2"
        >
          { strMeal || strDrink }
        </span>
      </div>
    </button>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RecipeCard;
