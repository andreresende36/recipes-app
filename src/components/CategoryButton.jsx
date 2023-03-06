import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function CategoryButton({ strCategory, drinkOrMeal }) {
  const { setApiURLMeals, setApiURLDrinks,
    apiURLMeals, apiURLDrinks } = useContext(RecipesContext);

  const handleClickCategory = () => {
    switch (drinkOrMeal) {
    case 'drink':
      if (apiURLDrinks === `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`) {
        setApiURLDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        break;
      }
      setApiURLDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`);
      break;
    default:
      if (apiURLMeals === `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`) {
        setApiURLMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        break;
      }
      setApiURLMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
    }
  };
  return (
    <button
      type="button"
      data-testid={ `${strCategory}-category-filter` }
      className="category-button"
      onClick={ handleClickCategory }
    >
      {strCategory}
    </button>
  );
}

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  drinkOrMeal: PropTypes.string.isRequired,
};

export default CategoryButton;
