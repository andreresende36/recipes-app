import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Drinks() {
  const { drinks } = useContext(RecipesContext);
  const numberOfDrinksToShow = 12;
  return (
    <div>
      <Header />
      <Recipes recipes={ drinks.slice(0, numberOfDrinksToShow) } />
      <Footer />
    </div>
  );
}

export default Drinks;
