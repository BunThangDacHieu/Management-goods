import React, { useContext } from 'react';
import { Navbar, Button, Dropdown } from 'react-bootstrap';
import { Bell, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../css/Header.css';

export default function Header({ isSidebarOpen }) {
    const { user, userRole, handleLogout } = useContext(AuthContext);
    
    return (
        <div className={`header-wrapper ${isSidebarOpen ? 'header-expanded' : 'header-collapsed'}`}>
            <Navbar bg="light" className="header-nav shadow-sm">
                <div className="d-flex justify-content-between align-items-center w-100 px-4">
                    <div className="d-flex align-items-center ms-auto">
                        <Dropdown align="end" className="me-3">
                            <Dropdown.Toggle variant="link" className="p-1 position-relative">
                                <Bell size={20} className="text-muted" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    3
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>Thông báo mới</Dropdown.Item>
                                <Dropdown.Item>Tin nhắn mới</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Xem tất cả</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" className="p-1 d-flex align-items-center text-dark text-decoration-none">
                                <User size={20} className="me-2 text-muted" />
                                <span>{userRole === 'Manager' ? 'Manager' : userRole === 'Supplier' ? 'Supplier' : 'Employee'}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {user && ( // Kiểm tra `user` trước khi truy cập `user.id`
                                    <Dropdown.Item as={Link} to={`/profile/${user._id}`}>Hồ sơ</Dropdown.Item>
                                )}

                                {userRole === 'Manager' && ( // Kiểm tra vai trò ở đây
                                    <Dropdown.Item as={Link} to="/manager-dashboard">Phân Quyền</Dropdown.Item>
                                )}
                                <Dropdown.Item>Cài đặt</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="text-danger" onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Navbar>
        </div>
    );
}
