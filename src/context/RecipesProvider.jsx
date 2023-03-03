import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories } from '../services/apiServices';

function RecipesProvider({ children }) {
  const [apiURL, setApiURL] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  // Deixei essa função aqui para ser implementada ainda. André Resende
  const handleSearch = (newSearch) => {
    setApiURL(newSearch);
  };

  const data = useMemo(
    () => ({ apiURL,
      meals,
      drinks,
      mealsCategories,
      drinksCategories,
      handleSearch }),
    [apiURL,
      meals,
      drinks,
      mealsCategories,
      drinksCategories],
  );
  useEffect(() => {
    getMeals(apiURL).then((response) => setMeals(response));
    getDrinks(apiURL).then((response) => setDrinks(response));
    getMealsCategories().then((response) => setMealsCategories(response));
    getDrinksCategories().then((response) => setDrinksCategories(response));
  }, [apiURL]);
  return (
    <RecipesContext.Provider
      value={ data }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesProvider;
