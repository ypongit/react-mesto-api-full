import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header({ userData, loggedIn, onSignOut, email}) {
  // console.log("Header userData email-> ", email);
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className='logo' />
      <div className='header__link-container'>
        {/* {email && ()} */}
        <span className='header__user-mail'>{email}</span>
        <Route path='/signup'>
          <Link className='header__link' to='/signin'>
            Войти
          </Link>
        </Route>
        <Route path='/signin'>
          <Link className='header__link' to='/signup'>
            Регистрация
          </Link>
        </Route>
        <Route exact path='/'>
          <Link onClick={onSignOut} className='header__link' to='/signin'>
            Выйти
          </Link>
        </Route>
      </div>
    </header>
    )
}

export default Header;

