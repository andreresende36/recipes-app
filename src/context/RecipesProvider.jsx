import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories } from '../services/apiServices';

function RecipesProvider({ children }) {
  const [apiURLMeals, setApiURLMeals] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [apiURLDrinks, setApiURLDrinks] = useState('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  // Deixei essa função aqui para ser implementada ainda. André Resende
  const handleSearch = (newSearch) => {
    setApiURL(newSearch);
  };

  const data = useMemo(
    () => ({ apiURLMeals,
      apiURLDrinks,
      meals,
      drinks,
      mealsCategories,
      drinksCategories,
      setApiURLMeals,
      setApiURLDrinks,
      handleSearch }),
    [apiURLMeals,
      apiURLDrinks,
      meals,
      drinks,
      mealsCategories,
      drinksCategories],
  );
  useEffect(() => {
    getMeals(apiURLMeals).then((response) => setMeals(response));
    getDrinks(apiURLDrinks).then((response) => setDrinks(response));
    getMealsCategories().then((response) => setMealsCategories(response));
    getDrinksCategories().then((response) => setDrinksCategories(response));
  }, [apiURLDrinks, apiURLMeals]);
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
