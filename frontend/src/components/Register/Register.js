import React, { useState } from "react";
import {Link, withRouter} from "react-router-dom";
import * as mestoAuth from '../../mestoAuth'

function Register(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('state!', state)
    // TODO: добавить логику обработки формы регистрации
    // if (state.password === state.confirmPassword){}
    let {email, password} = state;
    props.handleRegister(email, password)
    .catch((err) => {
      setState(prev => ({
        ...prev,
        message: err
      }))
    });
    /* mestoAuth.register(state.email, state.password)
    .then((res) => {
      if(res){
        setState({
          message: ''
        }, () => {
          props.history.push('/signin');
        })
      }
    }) */

  }

  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <p className="register__error">
        {state.message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          type="email"
          className="register__input"
          name="email"
          id="email"
          required
          minLength="2"
          maxLength="20"
          placeholder="Email"
          value={state.email}
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
          value={state.password}
          onChange={handleChange}
        />

        <button
          className="register__submit"
          type='submit'
        >Зарегистрироваться</button>
        <Link className="register__link" to="/signin">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  )
}

export default Register;
