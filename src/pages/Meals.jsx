import React from 'react';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <Header headerType={ { title: 'Meals', profileIcon: true, searchIcon: true } } />
    </div>
  );
}

export default Meals;
