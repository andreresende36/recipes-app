import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Meals() {
  const { meals } = useContext(RecipesContext);
  const numberOfMealsToShow = 12;
  return (
    <div>
      <Header />
      <Recipes recipes={ meals.slice(0, numberOfMealsToShow) } />
      <Footer />
    </div>
  );
}

export default Meals;
