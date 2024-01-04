import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <UserContext.Provider value={{shouldUpdateUsers, setShouldUpdateUsers, page, setPage, users, setUsers}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};