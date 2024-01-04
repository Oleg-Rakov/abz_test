import React from 'react';
import Info from "../Info";
import Users from "../Users";
import Form from "../Form";
import {UserProvider} from "../UserProvider";
import style from './wrapper.module.scss';

const Wrapper = () => {
  return (
    <UserProvider>
      <div className={style.wrapper}>
        <Info/>
        <Users/>
        <Form/>
      </div>
    </UserProvider>
  );
};

export default Wrapper;