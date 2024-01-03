import React, {useEffect, useState} from 'react';
import User from "./User";
import style from './users.module.scss';
import {BASE_URL, COUNTER_PER_PAGE} from "../../api/api";
import {fetchErrorHandle} from "../../helpers/fetchErrorHandle";

const Items = () => {
  const [users, setUsers] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [errorFetch, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users?page=${page}&count=${COUNTER_PER_PAGE}`);
        const data = await response.json();

        fetchErrorHandle(data.message, setFetchError)

        if (data.message === 'Page not found') {
          setFetchError(true);
          return;
        }

        const sortedUsers = data.users.sort((a, b) => new Date(b.registration_timestamp * 1000) - new Date(a.registration_timestamp * 1000));
        setUsers(prevUsers => [...prevUsers, ...sortedUsers]);
        setLoading(false);
        setDisableButton(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setDisableButton(false);
      }
    };
    fetchData()
  }, [page]);

  const handleShowMore = () => {
    setDisableButton(true);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Working with GET request</div>

      {loading ? (
        <div className={style.load}>Loading...</div>
      ) : (
        <>
          <div className={style.users}>
            {users.length > 0 && users.map(user => <User user={user} key={user.id}/>)}
          </div>

          {!errorFetch && (
            <div className={style.btn}>
              <button onClick={handleShowMore} disabled={disableButton}>Show more</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Items;