import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Settings, Shield, ChevronLeft,ChevronRight,Truck,Package,Route} from 'lucide-react';
import '../css/Sidebar.css';

export default function Sidebar({ isOpen, toggleSidebar }) {
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: <Home size={20} />, label: 'Trang chủ' },
        { path: '/shipments', icon: <Truck size={20} />, label: 'Quản lý vận chuyển' },
        { path: '/packages', icon: <Package size={20} />, label: 'Quản lý hàng hóa' },
        { path: '/inventory', icon: <Package size={20} />, label: 'Kho hàng' },
        { path: '/routes', icon: <Route size={20} />, label: 'Tuyến đường' },
        { path: '/user-settings', icon: <Settings size={20} />, label: 'Cài đặt' },
        { path: '/permissions', icon: <Shield size={20} />, label: 'Phân quyền' },
    ];

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
                            <small className="text-muted">Logistics System</small>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <button 
                className="toggle-btn"
                onClick={toggleSidebar}
            >
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Navigation Menu */}
            <Nav className="flex-column mt-3">
                {menuItems.map((item, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link 
                            as={Link} 
                            to={item.path}
                            className={`sidebar-link d-flex align-items-center ${location.pathname === item.path ? 'active' : ''} px-3 py-2`}
                        >
                            <span className="icon-wrapper">{item.icon}</span>
                            {isOpen && <span className="ms-3 menu-label">{item.label}</span>}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
};