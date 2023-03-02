import React, { useState } from 'react';

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  function handleCheckEmail({ target: { name, value } }) {
    setLoginData({ ...loginData, [name]: value });

    // avalia se o a senha e o email estão corretos
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minChar = 6;
    if (loginData.email.length >= minChar
        && re.test(loginData.email) && loginData.password.length >= minChar) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }

  return (
    <div>
      <input
        type="text"
        name="email"
        id=""
        data-testid="email-input"
        onChange={ handleCheckEmail }
      />
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
      >
        Enter

      </button>
    </div>
  );
}
