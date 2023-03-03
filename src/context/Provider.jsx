import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories } from '../services/apiServices';

function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  // Deixei essa função aqui para ser implementada ainda. André Resende
  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const data = useMemo(
    () => ({ search,
      meals,
      drinks,
      mealsCategories,
      drinksCategories,
      handleSearch }),
    [search,
      meals,
      drinks,
      mealsCategories,
      drinksCategories],
  );
  useEffect(() => {
    getMeals(search).then((response) => setMeals(response));
    getDrinks(search).then((response) => setDrinks(response));
    getMealsCategories().then((response) => setMealsCategories(response));
    getDrinksCategories().then((response) => setDrinksCategories(response));
  }, [search]);
  return (
    <RecipesContext.Provider
      value={ data }
    >
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
