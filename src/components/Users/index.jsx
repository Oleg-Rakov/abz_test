import React, {useEffect, useState} from 'react';
import User from "./User";
import style from './users.module.scss';
import {BASE_URL, COUNTER_PER_PAGE} from "../../api/api";
import {fetchErrorHandle} from "../../helpers/fetchErrorHandle";
import Button from "../Button";
import {useUserContext} from "../UserProvider";

const Users = () => {
  const {shouldUpdateUsers, setShouldUpdateUsers, page, setPage, users, setUsers} = useUserContext();
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users?page=${page}&count=${COUNTER_PER_PAGE}`);
        const data = await response.json();

        fetchErrorHandle(data.message, setFetchError);

        const sortedUsers = data.users.sort((a, b) => new Date(b.registration_timestamp * 1000) - new Date(a.registration_timestamp * 1000));
        if (!shouldUpdateUsers) {
          setUsers(prevUsers => [...prevUsers, ...sortedUsers]);
        }

        setLoading(false);
        setDisableButton(false);
        setShouldUpdateUsers(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setDisableButton(false);
        setShouldUpdateUsers(false);
      }
    };
    fetchData();
  }, [page, shouldUpdateUsers]);

  const handleShowMoreClick = () => {
    setDisableButton(true);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div id="users" className={style.wrapper}>
      <div className={style.title}>Working with GET request</div>

      {loading ? (
        <div className={style.load}>Loading...</div>
      ) : (
        <>
          <div className={style.users}>
            {users.length > 0 &&
              users.map((user) => <User user={user} key={user.id}/>)
            }
          </div>
          {!errorFetch && (
            <div className={style.btn}>
              <Button text="Show more" onClickHandler={handleShowMoreClick} isDisabled={disableButton}/>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;