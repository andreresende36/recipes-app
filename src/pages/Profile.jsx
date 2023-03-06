import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  return (
    <div>
      <Header
        headerType={ { title: 'Profile', profileIcon: true, searcIcon: false } }
        { ...props }
      />
      <Footer { ...props } />
    </div>
  );
}

export default Profile;
