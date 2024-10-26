import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { Home, Truck, Package, Route, Settings, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import '../css/Sidebar.css';

export default function Sidebar({ isOpen, toggleSidebar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [submenuState, setSubmenuState] = useState({});

    const menuItems = [
        { path: '/', icon: <Home size={20} />, label: 'Trang chủ' },
        { path: '/shipments', icon: <Truck size={20} />, label: 'Quản lý vận chuyển' },
        { 
            icon: <Package size={20} />, 
            label: 'Quản lý hàng hóa', 
            subItems: [
                { path: '/product-list', label: 'Danh sách sản phẩm' },
                { path: '/inventory', label: 'Quản lý kho' },
                { path: '/', label:'Nhập hàng'}
            ]
        },
        { path: '/routes', icon: <Route size={20} />, label: 'Tuyến đường' },
        { 
            icon: <Settings size={20} />, 
            label: 'Cài đặt', 
            path:'/setting'
        }
    ];

    const toggleSubmenu = (item) => {
        if (!item.subItems) {
            navigate(item.path);
        } else {
            setSubmenuState((prevState) => ({
                ...prevState,
                [item.label]: !prevState[item.label]
            }));
        }
    };

    return (
        <div className={`sidebar bg-dark text-white ${isOpen ? 'expanded' : 'collapsed'}`}>
        {/* Logo Section */}
        <div className="logo-section p-3 border-bottom border-secondary">
            <div className="d-flex align-items-center">
                <div className="logo-container me-2">
                    <Truck size={32} className="text-primary" />
                </div>
                {isOpen && (
                    <div className="logo-text">
                        <h5 className="mb-0">LogisTech</h5>
                        <small className="primary">Logistics System</small>
                    </div>
                )}
            </div>
        </div>

        {/* Toggle Button */}
        {/* <button 
            className="toggle-btn"
            onClick={toggleSidebar}
        >
            {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button> */}

        {/* Navigation Menu */}
        <Nav className="flex-column mt-3">
            {menuItems.map((item, index) => (
                <Nav.Item key={index} className="sidebar-item">
                    <div 
                        className={`sidebar-link d-flex align-items-center px-3 py-2 ${location.pathname === item.path || submenuState[item.label] ? 'active' : ''}`}
                        onClick={() => toggleSubmenu(item)}
                    >
                        <span className="icon-wrapper">{item.icon}</span>
                        {isOpen && <span className="ms-3 menu-label">{item.label}</span>}
                        {item.subItems && (
                            <span className="ms-auto expand-toggle">
                                {submenuState[item.label] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </span>
                        )}
                    </div>
                    {/* Submenu Items */}
                    {item.subItems && submenuState[item.label] && (
                        <div className="submenu">
                            {item.subItems.map((subItem, subIndex) => (
                                <Nav.Link 
                                    as={Link} 
                                    to={subItem.path} 
                                    key={subIndex}
                                    className={`sidebar-link d-flex align-items-center ps-5 py-1 ${location.pathname === subItem.path ? 'active' : ''}`}
                                >
                                    {subItem.label}
                                </Nav.Link>
                            ))}
                        </div>
                    )}
                </Nav.Item>
            ))}
        </Nav>
    </div>
    );
}
