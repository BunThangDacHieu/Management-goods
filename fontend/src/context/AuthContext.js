import React, { createContext, useState, useEffect } from 'react';
import { commonLogin, logout as apiLogout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

   const handleLogin = async (credentials) => {
        try {
            const response = await commonLogin(credentials); // Gọi hàm đăng nhập
            console.log("Login response:", response.data); // Xem phản hồi từ API

            const { token: newToken, role } = response.data; // Giả định API trả về token và role

            setToken(newToken); // Lưu token vào state
            setUserRole(role); // Thiết lập vai trò
            localStorage.setItem('token', newToken); // Lưu token vào localStorage
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleLogout = () => {
      apiLogout()
        setUserRole(null); // Reset vai trò khi đăng xuất
        setToken(null); // Reset token
        localStorage.removeItem('token'); // Xóa token
    };


  return (
    <AuthContext.Provider value={{ token,setUserRole,userRole, handleLogin, handleLogout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
