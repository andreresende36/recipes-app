import React from 'react';
import Header from '../components/Header';

function DoneRecipes(props) {
  return (
    <div>
      <Header
        headerType={ { title: 'Done Recipes', profileIcon: true, searchIcon: false } }
        { ...props }
      />
    </div>
  );
}

export default DoneRecipes;
