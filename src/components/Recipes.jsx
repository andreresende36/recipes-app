import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function Recipes({ recipes, history }) {
  const numberOfRecipesToShow = 12;
  return (
    <div className="recipes-container" style={ { marginBottom: '80px' } }>
      {recipes.slice(0, numberOfRecipesToShow).map((recipe, index) => (
        <RecipeCard
          key={ recipe.idMeal || recipe.idDrink }
          recipe={ recipe }
          index={ index }
          className="recipe-card"
          history={ history }
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
  history: PropTypes.shape({}).isRequired,
};

export default Recipes;
