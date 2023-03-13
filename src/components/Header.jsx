import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import profileIconImg from '../images/profileIcon.svg';
import searchIconImg from '../images/searchIcon.svg';
import HeaderContext from '../context/HeaderContext';
import SearchBar from './SearchBar';

import { ReactComponent as RecipeLogoHeader } from '../images/RecipeHeaderLogo.svg';
import '../styles/header.css';

export default function Header(props) {
  const [searchingBarVisible, setSearchingBarVisible] = useState(false);

  const { headerType: { title, profileIcon, searchIcon } } = props;

  const { search, setSearch } = useContext(HeaderContext);
  const { history } = props;

  return (
    <div className="background-upper-bar">
      <div className="upper-header">
        <RecipeLogoHeader />
        <div className="profile-header">
          { profileIcon && (
            <button type="button" onClick={ () => history.push('/profile') }>
              <img data-testid="profile-top-btn" src={ profileIconImg } alt="" className='header-profile'/>
            </button>
          ) }
        </div>
      </div>
      <h1 data-testid="page-title">{ title }</h1>
      { searchingBarVisible && (
        <input
          type="text"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
          data-testid="search-input"
        />
      )}
      { searchingBarVisible && (
        <SearchBar title={ title } { ...props } />
      )}
      { searchIcon && (
        <button
          type="button"
          onClick={ () => setSearchingBarVisible(!searchingBarVisible) }
        >
          <img data-testid="search-top-btn" src={ searchIconImg } alt="" />
        </button>
      )}
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
