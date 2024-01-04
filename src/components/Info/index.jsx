import React from 'react';
import Button from "../Button";
import style from './info.module.scss';

const Info = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.title}>
          Test assignment for front-end developer
        </div>
        <div className={style.descr}>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
          understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They
          should also be excited to learn, as the world of Front-End Development keeps evolving.
        </div>
        <div className={style.btn}>
          <Button text='Sign up' targetId='signup'/>
        </div>
      </div>
    </div>
  );
};

export default Info;