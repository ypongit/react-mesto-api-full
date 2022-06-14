import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import * as mestoAuth from '../../mestoAuth';

const Login = (props) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    if (!inputs.email || !inputs.password) {
      return;
    }

    // console.log('email -> ', inputs.email)
    // console.log('password -> ', inputs.password)
    props.handleLogin(inputs.email, inputs.password)
      .catch(setMessage);
  }
  return (
    <section className="register">
      <h2 className="register__title">Вход</h2>
      <p className="login__error">
        {message}
      </p>
      <form
        className="register__form"
        onSubmit={handleSubmit}
        >
        <input
          type="email"
          className="register__input"
          name="email"
          id="email"
          required
          minLength="2"
          maxLength="20"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="register__input"
          name="password"
          id="password"
          required
          minLength="2"
          maxLength="20"
          placeholder="Пароль"
          value={inputs.password}
          onChange={handleChange}
        />
        <button
          className="register__submit"
          type="submit"
        >Войти</button>
      </form>
    </section>
  )
}

export default Login;
