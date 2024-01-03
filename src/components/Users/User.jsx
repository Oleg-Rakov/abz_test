import React from 'react';
import style from './users.module.scss';
import photoCover from "../../assets/images/photo-cover.svg";

const User = ({user}) => {
  const handleImageError = (event) => {
    event.target.src = photoCover;
  }

  return (
    <div className={style.user}>
      <div className={style.userImg}>
        <img src={user.photo} onError={handleImageError} alt={user.name}/>
      </div>
      <div className={`${style.userName} ${style.truncate}`} title={user.name}>{user.name}</div>
      <div className={`${style.userPosition} ${style.truncate}`} title={user.position}>{user.position}</div>
      <div className={`${style.userEmail} ${style.truncate}`} title={user.email}>{user.email}</div>
      <div className={`${style.userPhone} ${style.truncate}`} title={user.phone}>{user.phone}</div>
    </div>
  );
};

export default User;