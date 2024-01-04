import React from 'react';
import CustomToolTip from "../CustomTooltip";
import photoCover from "../../assets/images/photo-cover.svg";
import style from './users.module.scss';

const User = ({user}) => {
  const handleImageError = (event) => {
    event.target.src = photoCover;
  }

  return (
    <div className={style.user}>
      <div className={style.userImg}>
        <img src={user.photo} onError={handleImageError} alt={user.name}/>
      </div>
      <CustomToolTip text={user.name}>
        <div className={`${style.userName} ${style.truncate}`}>{user.name}</div>
      </CustomToolTip>
      <CustomToolTip text={user.position}>
        <div className={`${style.userPosition} ${style.truncate}`}>{user.position}</div>
      </CustomToolTip>
      <CustomToolTip text={user.email}>
        <div className={`${style.userEmail} ${style.truncate}`}>{user.email}</div>
      </CustomToolTip>
      <CustomToolTip text={user.phone}>
        <div className={`${style.userPhone} ${style.truncate}`}>{user.phone}</div>
      </CustomToolTip>
    </div>
  );
};

export default User;