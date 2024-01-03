import React from 'react';
import logo from '../../assets/images/header_logo.svg';
import style from './header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <img src={logo} alt='logo'/>
          <span>TESTTASK</span>
        </div>
        <div>
          <button>Users</button>
          <button>Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;