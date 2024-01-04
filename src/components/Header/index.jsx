import React from 'react';
import Button from "../Button";
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
        <div className={style.buttonWrapper}>
          <Button text='Users' targetId='users'/>
          <Button text='Sign up' targetId='signup'/>
        </div>
      </div>
    </header>
  );
};

export default Header;