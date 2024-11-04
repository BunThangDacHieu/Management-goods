import React, { useEffect, useState, useContext } from 'react';
import { getNotifications, markAsRead } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { Dropdown } from 'react-bootstrap';

export default function NotificationList() {
    const { token } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotifications(token);
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [token]);

    const handleMarkAsRead = async (id) => {
        await markAsRead(id, token);
        setNotifications(notifications.map(notification => 
            notification._id === id ? { ...notification, read: true } : notification
        ));
    };

    return (
        <Dropdown.Menu>
            {notifications.map(notification => (
                <Dropdown.Item 
                    key={notification._id} 
                    onClick={() => handleMarkAsRead(notification._id)}
                    active={!notification.read}
                >
                    {notification.message}
                </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item>Xem tất cả</Dropdown.Item>
        </Dropdown.Menu>
    );
}
