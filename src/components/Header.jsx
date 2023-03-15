import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import profileIconImg from '../images/profileIcon.svg';
import searchIconImg from '../images/searchIcon.svg';
import HeaderContext from '../context/HeaderContext';
import mealsIcon from '../images/mealsIcon.svg';
import drinksIcon from '../images/drinksIcon.svg';
import SearchBar from './SearchBar';
import '../styles/recipesFirstPage.css';

import { ReactComponent as RecipeLogoHeader } from '../images/RecipeHeaderLogo.svg';
import { ReactComponent as TextRecipe } from '../images/textRecipeApp.svg';
import '../styles/header.css';

export default function Header(props) {
  const [searchingBarVisible, setSearchingBarVisible] = useState(false);

  const { headerType: { title, profileIcon, searchIcon } } = props;

  const { search, setSearch } = useContext(HeaderContext);
  const { history } = props;

  return (
    <div className="background-upper-bar">
      <div className="upper-header">
        <span>
          <RecipeLogoHeader onClick={ () => history.push('/') } data-testid="logo-home" />
          <TextRecipe style={ { paddingLeft: '9px' } } />
        </span>
        <div className="header-header">
          { searchIcon && (
            <button
              type="button"
              onClick={ () => setSearchingBarVisible(!searchingBarVisible) }
              className="lupa"
            >
              <img data-testid="search-top-btn" src={ searchIconImg } alt="" />
            </button>
          )}
          { profileIcon && (
            <button
              type="button"
              className="button-logo"
              onClick={ () => history.push('/profile') }
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIconImg }
                alt=""
                className="header-logo"
              />
            </button>
          ) }
        </div>
      </div>
      <div className="container-page-title">
        <img
          src={ title === 'Meals'
            ? mealsIcon : drinksIcon }
          alt={ `icone de ${title}` }
          className="recipe-logo"
        />
        <h1 data-testid="page-title">{ title }</h1>
      </div>
      <div className="container-search">
        { searchingBarVisible && (
          <input
            type="text"
            value={ search }
            onChange={ ({ target }) => setSearch(target.value) }
            data-testid="search-input"
            className="search-input-text"
            placeholder="Search"
          />
        )}
        { searchingBarVisible && (
          <SearchBar title={ title } { ...props } />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  headerType: PropTypes.shape({
    title: PropTypes.string,
    profileIcon: PropTypes.bool,
    searchIcon: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
