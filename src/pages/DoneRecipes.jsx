import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header
        headerType={ { title: 'Done Recipes', profileIcon: true, searchIcon: false } }
      />
    </div>
  );
}

export default DoneRecipes;
