import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        headerType={ { title: 'Favorite Recipes', profileIcon: true, searchIcon: false } }
      />
    </div>
  );
}

export default FavoriteRecipes;
