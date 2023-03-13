import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import shareSvg from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/favoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    const recipesFunc = () => {
      const doneRecipes = localStorage.getItem('favoriteRecipes')
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
      return doneRecipes;
    };
    setRecipes(recipesFunc);
  }, []); //

  // console.log(recipes);

  const filteredRecipes = recipes.filter((recipe) => {
    if (filter === 'all') {
      return true;
    } if (filter === 'meal') {
      return recipe.type === 'meal';
    }
    return recipe.type === 'drink';
  });

  return (
    <div>
      <Header
        headerType={ { title: 'Favorite Recipes', profileIcon: true, searchIcon: false } }
        { ...props }
      />
      { filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ recipe.type === 'meal'
              ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
          >
            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt=""
              className="favorite-recipe-img"
            />
          </Link>
          { recipe.alcoholicOrNot ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
              {' '}
              -
              {' '}
              { recipe.category}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.nationality }
              {' '}
              -
              {' '}
              { recipe.category }
            </p>
          )}
          <button
            onClick={ () => {
              // handleClickFavorite();
              const localStorageRecipe = JSON.parse(localStorage
                .getItem('favoriteRecipes'))
                .filter((favRecipe) => favRecipe.id !== recipe.id);
              localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageRecipe));
              setRecipes(localStorageRecipe);
            } }
          >
            <img
              src={ blackHeartIcon }
              alt="favorite-icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          <button
            onClick={ () => {
              copy(`http://localhost:3000/meals/${recipe.id}`);
              setIsLinkCopied(true);
            } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareSvg }
              alt="share-icon"
            />
          </button>
          {isLinkCopied && <p>Link copied!</p>}
        </div>
      ))}
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => setFilter('meal') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilter('drink') }
      >
        Drinks

      </button>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
    </div>
  );
}

export default FavoriteRecipes;
