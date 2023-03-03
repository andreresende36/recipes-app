import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import CategoryButton from '../components/CategoryButton';

function Meals() {
  const { meals, mealsCategories } = useContext(RecipesContext);
  const numberOfCategoriesToShow = 5;
  return (
    <div className="meals-page">
      <div className="categories-buttons-container">
        {mealsCategories.slice(0, numberOfCategoriesToShow).map(({ strCategory }) => (
          <CategoryButton key={ strCategory } strCategory={ strCategory } />
        ))}
      </div>
      <Header />
      <Recipes recipes={ meals } />
      <Footer />
    </div>
  );
}

export default Meals;
