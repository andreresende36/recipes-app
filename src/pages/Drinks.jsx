import React from 'react';
import Header from '../components/Header';

function Drinks() {
  return (
    <div>
      <Header headerType={ { title: 'Drinks', profileIcon: true, searchIcon: true } } />
    </div>
  );
}

export default Drinks;
