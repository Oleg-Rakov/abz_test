import React from 'react';
import Info from "../Info";
import Items from "../Users";
import style from './wrapper.module.scss';

const Wrapper = () => {
  return (
    <div className={style.wrapper}>
      <Info/>
      <Items/>
    </div>
  );
};

export default Wrapper;