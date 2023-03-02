import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIconImg from '../images/profileIcon.svg';
import searchIconImg from '../images/searchIcon.svg';

export default function Header(props) {
  const [searchingBarVisible, setSearchingBarVisible] = useState(false);

  const { headerType: { title, profileIcon, searchIcon } } = props;

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      { profileIcon && (
        <Link to="/profile">
          <button data-testid="profile-top-btn" type="button">
            <img src={ profileIconImg } alt="" />
          </button>
        </Link>
      ) }
      { searchingBarVisible && (
        <input type="text" />
      )}
      { searchIcon && (
        <button
          data-testid="search-top-btn"
          type="button"
          onClick={ () => setSearchingBarVisible(!searchingBarVisible) }
        >
          <img src={ searchIconImg } alt="" />
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
