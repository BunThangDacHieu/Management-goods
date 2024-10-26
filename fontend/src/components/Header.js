// Header.js
import React, {useContext} from 'react';
import { Navbar, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { Menu, Search, Bell, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import '../css/Header.css';

export default function Header({isSidebarOpen }) {
    const { handleLogout } = useContext(AuthContext);

    return (
        <div className={`header-wrapper ${isSidebarOpen ? 'header-expanded' : 'header-collapsed'}`}>
            <Navbar bg="light" className="header-nav shadow-sm">
                <div className="d-flex justify-content-between align-items-center w-100 px-4">
                    {/* Left Section - Search */}
                    <div className="d-flex align-items-center">
                        <InputGroup style={{ width: '300px' }}>
                            <Form.Control
                                placeholder="Tìm kiếm..."
                                className="border-0 bg-light"
                            />
                            <Button variant="light">
                                <Search size={18} className="text-muted" />
                            </Button>
                        </InputGroup>
                    </div>

                    {/* Right Section - Notifications & Profile */}
                    <div className="d-flex align-items-center">
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
                                <span>Admin User</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>Hồ sơ</Dropdown.Item>
                                <Dropdown.Item>Phân Quyền</Dropdown.Item>
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