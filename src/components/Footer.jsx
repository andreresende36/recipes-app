import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="drink-icon" />
      </Link>
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="meal-icon" />
      </Link>
    </footer>
  );
}
