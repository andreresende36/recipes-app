import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import { ReactComponent as ReactLogo } from '../images/recipes_logo.svg';
// import '../styles/tailWind.css';

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const history = useHistory();
  const handleCheckEmail = ({ target: { name, value } }) => {
    setLoginData({ ...loginData, [name]: value });

    // Avalia se o a senha e o email estão corretos
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minChar = 6;
    if (loginData.email.length >= minChar
        && re.test(loginData.email) && loginData.password.length >= minChar) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  };

  // Aqui para setar LocalStorage
  const handleSubmitLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
    history.push('/meals');
  };

  return (
    <div className="card-login">
      <ReactLogo />
      <img
        alt="tomate"
        className="tomate"
      />
      <h3 className="texto">email</h3>
      <input
        type="text"
        name="email"
        id=""
        data-testid="email-input"
        onChange={ handleCheckEmail }
      />
      <br />
      <h3>password</h3>
      <input
        type="text"
        name="password"
        id=""
        data-testid="password-input"
        onChange={ handleCheckEmail }
      />
      <button
        type="button"
        name=""
        id=""
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleSubmitLogin }
      >
        Enter
      </button>
    </div>
  );
}
