import React from 'react';
import PropTypes from 'prop-types';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/footer.css';

export default function Footer({ history }) {
  return (
    <footer data-testid="footer" className="footer-container">
      <button onClick={ () => history.push('/meals') } className="footer-button-meal">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meal-icon" />
      </button>
      <button
        onClick={ () => history.push('/drinks') }
        className="footer-button-drink"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-icon"
        />
      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
