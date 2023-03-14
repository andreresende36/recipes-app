import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import beef from '../images/beef.svg';
import goat from '../images/goat.svg';
import chicken from '../images/chicken.svg';
import breakfast from '../images/breakfast.svg';
import dessert from '../images/dessert.svg';
import ordinaryDrink from '../images/ordinaryDrink.svg';
import cocktail from '../images/cocktail.svg';
import shake from '../images/shake.svg';
import other from '../images/other.svg';
import cocoa from '../images/cocoa.svg';

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

  const imagePicker = (category) => {
    switch (category) {
    case 'Beef':
      return beef;
    case 'Goat':
      return goat;
    case 'Chicken':
      return chicken;
    case 'Breakfast':
      return breakfast;
    case 'Dessert':
      return dessert;
    case 'Ordinary Drink':
      return ordinaryDrink;
    case 'Cocktail':
      return cocktail;
    case 'Shake':
      return shake;
    case 'Other / Unknown':
      return other;
    default:
      return cocoa;
    }
  };

  return (
    <div className="category-button-container">
      <button
        type="button"
        data-testid={ `${strCategory}-category-filter` }
        className="category-button"
        onClick={ handleClickCategory }
      >
        <img
          src={ imagePicker(strCategory) }
          alt={ `categoria ${strCategory}` }
          className="category-icon"
        />
      </button>
      <p className="category-name">{ strCategory }</p>
    </div>
  );
}

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  drinkOrMeal: PropTypes.string.isRequired,
};

export default CategoryButton;
