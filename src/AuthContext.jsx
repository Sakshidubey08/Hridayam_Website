import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  // Example function to set user information
  const setUser = (user) => {
    setAuthState(user);
  };

  return (
    <AuthContext.Provider value={{ authState, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
