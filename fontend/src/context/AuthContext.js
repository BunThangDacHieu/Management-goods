import React, { createContext, useState, useEffect } from 'react';
import { SystemLogin, logout as apiLogout, getAllUsers, getUserById } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [user, setUser] = useState(null);
    const [allUser, setAllUsers] = useState([]);

    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);

        const decodedToken = JSON.parse(atob(newToken.split('.')[1]));
        setUserRole(decodedToken.role);
        setUserId(decodedToken.id);
    };
  const fetchUserInfo = async () => {
    if (!token) return; // Kiểm tra token trước khi gọi API
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id; 

        const response = await getUserById(userId, token); 
        setUser(response.data);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
};

const fetchAllUsers = async () => {
    if (token) {
        try {
            const response = await getAllUsers(token);
            setAllUsers(response.data);
        } catch (error) {
            console.error('Lỗi nhận thông tin tất cả người dùng:', error);
        }
    }
};

useEffect(() => {
    if (token) {
        fetchUserInfo();
        fetchAllUsers();
    } else {
        setUser(null);
        setAllUsers([]);
        localStorage.removeItem('token');
    }
}, [token]);

    const handleLogout = () => {
        apiLogout();
        setUserRole(null); // Reset vai trò khi đăng xuất
        setUserId(null);
        setToken(null); // Reset token
        localStorage.removeItem('token'); // Xóa token
    };
    
    return (
        <AuthContext.Provider value={{ token,user,userId, setUserRole,updateToken, userRole, handleLogout, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
