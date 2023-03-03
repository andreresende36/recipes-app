import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes(props) {
  return (
    <div>
      <Header
        headerType={ { title: 'Favorite Recipes', profileIcon: true, searchIcon: false } }
        { ...props }
      />
    </div>
  );
}

export default FavoriteRecipes;
