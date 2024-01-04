import React from 'react';
import style from "./form.module.scss";

const InputForm = ({type, placeholder, value, changeHandler, error}) => {
  return (
    <div className={style.inputWrapper}>
      <input type={type} placeholder={placeholder} value={value} onChange={changeHandler}/>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};

export default InputForm;