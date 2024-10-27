import React, { createContext, useState, useEffect } from 'react';
import { managerLogin, commonLogin, logout as apiLogout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const handleLogin = async (data) => {
    const response = await commonLogin(data);
    setToken(response.data.token);
  };
  const handleLogout = () => {
    apiLogout(); // Gọi hàm logout từ API
    setToken(null); // Đặt lại token về null
    if (navigate) navigate('/login');  // Điều hướng về trang đăng nhập
  };


  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
