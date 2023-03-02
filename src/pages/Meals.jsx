import React from 'react';
import Header from '../components/Header';

function Meals(props) {
  return (
    <div>
      <Header
        headerType={ { title: 'Meals', profileIcon: true, searchIcon: true } }
        { ...props }
      />

    </div>
  );
}

export default Meals;
