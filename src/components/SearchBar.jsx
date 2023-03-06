import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';

function SearchBar(props) {
  // apiURL vai ser passado pro provider pra usar na listagem de produtos, mas como n foi criado ainda deixei aqui
  // mas dai quando tiver o provider vai todos os estados e a função
  const [/* apiURL, */setApiURL] = useState('');
  const [searchType, setSearchType] = useState('ingredient');
  const [mealOrCockTail, setMealOrCockTail] = useState('meal');

  const { search } = useContext(HeaderContext);

  const handleClickSearch = () => {
    // Falta adicionar o que tem na barra de busca do header
    switch (searchType) {
    case 'ingredient':
      // se for cocktail muda o link
      if (mealOrCockTail === 'cocktail') {
        setApiURL(`'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
        break;
      }
      setApiURL(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    case 'name':
      // se for cocktail muda o link
      if (mealOrCockTail === 'cocktail') {
        setApiURL(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        break;
      }
      setApiURL(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      break;
    default:
      if (search.length > 0) {
        global.alert('Your search must have only 1 (one) character');
      }
      // se for cocktail muda o link
      if (mealOrCockTail === 'cocktail') {
        setApiURL(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
        break;
      }
      setApiURL(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
      break;
    }
  };

  useEffect(() => {
    // se tiver na pagina de bebidas seta como bebidas a variavel que armazena isso
    const { title } = props;
    if (title === 'Drinks') {
      setMealOrCockTail('cocktail');
    }
  }, [props]);

  return (
    <div>
      <input
        type="radio"
        name="searchType"
        id="search-ingredient"
        data-testid="ingredient-search-radio"
        value="ingredient"
        checked={ searchType === 'ingredient' }
        onClick={ () => setSearchType('ingredient') }
      />
      <input
        type="radio"
        name="searchType"
        id="search-name"
        data-testid="name-search-radio"
        value="name"
        checked={ searchType === 'name' }
        onClick={ () => setSearchType('name') }
      />
      <input
        type="radio"
        name="searchType"
        id="search-firstLetter"
        data-testid="first-letter-search-radio"
        value="firstLetter"
        checked={ searchType === 'firstLetter' }
        onClick={ () => setSearchType('firstLetter') }
      />
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
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchBar;
