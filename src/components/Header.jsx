import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import profileIconImg from '../images/profileIcon.svg';
import searchIconImg from '../images/searchIcon.svg';
import HeaderContext from '../context/HeaderContext';
import SearchBar from './SearchBar';

export default function Header(props) {
  const [searchingBarVisible, setSearchingBarVisible] = useState(false);

  const { headerType: { title, profileIcon, searchIcon } } = props;

  const { search, setSearch } = useContext(HeaderContext);

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      { profileIcon && (
        <button type="button">
          <img data-testid="profile-top-btn" src={ profileIconImg } alt="" />
        </button>
      ) }
      { searchingBarVisible && (
        <input
          type="text"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
          data-testid="search-input"
        />
      )}
      { searchingBarVisible && (
        <SearchBar title={ title } />
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
};
