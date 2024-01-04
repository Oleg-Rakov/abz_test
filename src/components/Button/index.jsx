import React from 'react';
import style from './button.module.scss';

const Button = ({text, onClickHandler, targetId, isDisabled}) => {
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    };
  };

  const handleClick = () => {
    if (onClickHandler) {
      onClickHandler();
    };

    if (targetId) {
      scrollToTarget();
    };
  };

  return (
    <div className={style.btnWrapper}>
      <button className={style.commonButton} onClick={handleClick} disabled={isDisabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;