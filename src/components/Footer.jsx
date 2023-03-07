import React from 'react';
import PropTypes from 'prop-types';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function Footer({ history }) {
  return (
    <footer data-testid="footer">
      <button onClick={ () => history.push('/meals') }>
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meal-icon" />
      </button>
      <button onClick={ () => history.push('/drinks') }>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink-icon" />
      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
