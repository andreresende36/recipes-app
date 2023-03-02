import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { getMeals, getDrinks } from '../services/apiServices';

function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  // Deixei essa função aqui para ser implementada ainda. André Resende
  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const data = useMemo(
    () => ({ search,
      meals,
      drinks,
      handleSearch }),
    [search,
      meals,
      drinks],
  );
  useEffect(() => {
    getMeals(search).then((response) => setMeals(response));
    getDrinks(search).then((response) => setDrinks(response));
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
