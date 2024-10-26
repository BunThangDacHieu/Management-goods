import React, { createContext, useState, useEffect } from 'react';
import { managerLogin, commonLogin, logout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const handleLogin = async (data, role = "common") => {
    const loginFunction = role === "manager" ? managerLogin : commonLogin;
    const response = await loginFunction(data);
    setToken(response.data.token);
  };

  const handleLogout = () => {
    logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
