import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import CategoryButton from '../components/CategoryButton';

function Meals(props) {
  const { meals, mealsCategories, setApiURLMeals } = useContext(RecipesContext);
  const numberOfCategoriesToShow = 5;
  return (
    <div className="meals-page">
      <Header
        headerType={ { title: 'Meals', profileIcon: true, searchIcon: true } }
        { ...props }
      />
      <div className="categories-buttons-container">
        {mealsCategories.slice(0, numberOfCategoriesToShow).map(({ strCategory }) => (
          <CategoryButton
            key={ strCategory }
            strCategory={ strCategory }
            drinkOrMeal="meal"
          />
        ))}
        <button data-testid="All-category-filter" onClick={ () => setApiURLMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=') }>Remove All Filters</button>
      </div>
      <Recipes recipes={ meals } { ...props } />
      <Footer { ...props } />
    </div>
  );
}

export default Meals;
