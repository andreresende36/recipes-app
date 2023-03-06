import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function Recipes({ recipes }) {
  const numberOfRecipesToShow = 12;
  return (
    <div className="recipes-container">
      {recipes.slice(0, numberOfRecipesToShow).map((recipe, index) => (
        <RecipeCard
          key={ recipe.idMeal || recipe.idDrink }
          recipe={ recipe }
          index={ index }
          className="recipe-card"
        />
      ))}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  })).isRequired,
};

export default Recipes;
