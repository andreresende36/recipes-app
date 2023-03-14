import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import CategoryButton from '../components/CategoryButton';
import allMeals from '../images/allMeals.svg';
import '../styles/recipesFirstPage.css';

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
        <div className="category-button-container">
          <button
            data-testid="All-category-filter"
            onClick={ () => setApiURLMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=') }
            className="category-button"
          >
            <img
              src={ allMeals }
              alt="icone de Meals"
              className="category-icon"
            />
          </button>
          <p className="category-name">All</p>
        </div>
        {mealsCategories.slice(0, numberOfCategoriesToShow).map(({ strCategory }) => (
          <CategoryButton
            key={ strCategory }
            strCategory={ strCategory }
            drinkOrMeal="meal"
          />
        ))}
      </div>
      <Recipes recipes={ meals } { ...props } />
      <Footer { ...props } />
    </div>
  );
}

export default Meals;
