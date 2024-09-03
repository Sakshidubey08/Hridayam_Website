import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigatecontext = createContext();

export const MyProvider = ({ children }) => {
  const navigate = useNavigate();

  const placeorderdone = (path) => {
    navigate("./placeorder");
  };

  return (
    <Navigatecontext.Provider value={{ placeorderdone }}>
      {children}
    </Navigatecontext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
