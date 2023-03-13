import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/profile.css';
import { ReactComponent as ProfileLogo } from '../images/Perfil.svg';
import { ReactComponent as OkVector } from '../images/okVector.svg';
// 57 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo Ok
// 58 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível

function Profile(props) {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    let emailStorage = localStorage.getItem('user');
    if (emailStorage === null) {
      emailStorage = 'not valid';
    } else {
      emailStorage = JSON.parse(emailStorage);
    }
    setEmail(emailStorage.email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header
        headerType={ { title: 'Profile', profileIcon: true, searcIcon: false } }
        { ...props }
      />
      <div className="tela-profile">
        <div className="user-info">
          <ProfileLogo className="profile-logo" />
          <p data-testid="profile-email" className="email">{email}</p>
        </div>
        <div className="button-profile">
          <OkVector />
          <button
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
        </div>
        <div className="button-profile">
          <OkVector />
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
        </div>
        <div className="button-profile">
          <OkVector />
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </div>
      </div>
      <Footer { ...props } />

    </div>
  );
}

export default Profile;
