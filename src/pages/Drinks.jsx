import React from 'react';
import Header from '../components/Header';

function Drinks(props) {
  console.log(props);
  return (
    <div>
      <Header
        headerType={ { title: 'Drinks', profileIcon: true, searchIcon: true } }
        { ...props }
      />
    </div>
  );
}

export default Drinks;
