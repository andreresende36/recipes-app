import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import '../styles/header.css';

function SearchBar(props) {
  // apiURL vai ser passado pro provider pra usar na listagem de produtos, mas como n foi criado ainda deixei aqui
  // mas dai quando tiver o provider vai todos os estados e a função
  const [searchType, setSearchType] = useState('ingredient');
  const [mealOrCockTail, setMealOrCockTail] = useState('meal');

  const { search } = useContext(HeaderContext);
  const { setApiURLMeals, setApiURLDrinks } = useContext(RecipesContext);
  const { meals, drinks } = useContext(RecipesContext);
  const { history } = props;

  const handleClickSearch = useCallback(() => {
    // Falta adicionar o que tem na barra de busca do header
    switch (searchType) {
    case 'ingredient':
      // se for cocktail muda o link
      if (mealOrCockTail === 'cocktail') {
        setApiURLDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
        break;
      }
      setApiURLMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    case 'name':
      // se for cocktail muda o link
      if (mealOrCockTail === 'cocktail') {
        setApiURLDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        break;
      }
      setApiURLMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      break;
    default:
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      // se for cocktail muda o link
      if (mealOrCockTail === 'cocktail') {
        setApiURLDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
        break;
      }
      setApiURLMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
      break;
    }
  }, [mealOrCockTail, search, searchType, setApiURLDrinks, setApiURLMeals]);

  useEffect(() => {
    if (meals.length === 1) {
      history.push(`/meals/${meals[0].idMeal}`);
    }
    if (drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    }
    if (drinks.length === 0 || meals.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [drinks, meals]);

  useEffect(() => {
    // se tiver na pagina de bebidas seta como bebidas a variavel que armazena isso
    const { title } = props;
    if (title === 'Drinks') {
      setMealOrCockTail('cocktail');
    }
  }, [props]);

  return (
    <div className="search-bar-results">
      <span className="search-radios">
        <input
          type="radio"
          name="searchType"
          id="search-ingredient"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ () => setSearchType('ingredient') }
        />
        <p>ingredient</p>
        <input
          type="radio"
          name="searchType"
          id="search-name"
          data-testid="name-search-radio"
          value="name"
          onChange={ () => setSearchType('name') }
        />
        <p>name</p>
        <input
          type="radio"
          name="searchType"
          id="search-firstLetter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ () => setSearchType('firstLetter') }
        />
        <p>firstletter</p>
      </span>
      <button
        data-testid="exec-search-btn"
        onClick={ handleClickSearch }
      >
        Pesquisar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    pathname: PropTypes.string,
    push: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchBar;
