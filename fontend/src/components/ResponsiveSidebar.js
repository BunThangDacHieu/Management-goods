import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { List, X, LayoutDashboard, Table, User, BarChart2, AlertTriangle, ChevronDown, ChevronUp, ShoppingBag, AlignCenter } from 'lucide-react';
import Logo from '../Image/image.png';
import '../css/Sidebar.css';

const NavItem = ({ icon, children, to, subItems }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Nav.Item className="nav-item">
      {to ? (
        <Nav.Link as={NavLink} to={to} className="sidebar-item">
          {icon}
          <span className="item-label">{children}</span>
        </Nav.Link>
      ) : (
        <>
          <div className={`sidebar-item ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
            {icon}
            <span className="item-label">{children}</span>
            {subItems && <div className="chevron-icon">
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>}
          </div>
          {subItems && expanded && (
            <div className="sub-nav">
              {subItems.map((item, index) => (
                <Nav.Link key={index} as={NavLink} to={item.to} className="sidebar-item sub-item">
                  {item.icon}
                  <span className="item-label">{item.label}</span>
                </Nav.Link>
              ))}
            </div>
          )}
        </>
      )}
    </Nav.Item>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => setExpanded(!expanded);

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {expanded ? <X size={24} /> : <List size={24} />}
        </button>
        <span className="sidebar-title">
        <img src={Logo} alt="Logo" className="sidebar-logo" />
        </span>
      </div>

      <Nav className="flex-column sidebar-content">
        <NavItem icon={<LayoutDashboard size={20} />} to="/">Vận Chuyển</NavItem>
        <NavItem className = "justify-content-center align-items-center"
          style={{display: 'flex', alignItems: 'center'}}
          icon={<ShoppingBag  size={20} />} 
          subItems={[
            { to: "/", label: "Danh sách sản phẩm" },
            { to: "/", label: "Quản lý kho" },
            { to: "/", label: "Đặt hàng nhập"},
            { to: "/", label: "Nhập hàng"},
            { to: "/", label: "Kiểm hàng" },
            { to: "/", label: "Chuyển hàng" },
            { to: "/", label: "Nhà Cung cấp" },
            { to: "/", label: "Điều chỉnh giá vốn" }
          ]}
        >
          Sản Phẩm
        </NavItem>
        <NavItem className = "justify-content-center align-items-center"
          style={{display: 'flex', AlignCenter: 'center'}}
          icon={<User   size={20} />} 
          subItems={[
            { to: "/", label: "Danh sách sản phẩm" },
            { to: "/", label: "Quản lý kho" },
            { to: "/", label: "Đặt hàng nhập"},
            { to: "/", label: "Nhập hàng"},
            { to: "/", label: "Kiểm hàng" },
            { to: "/", label: "Chuyển hàng" },
            { to: "/", label: "Nhà Cung cấp" },
            { to: "/", label: "Điều chỉnh giá vốn" }
          ]}
        >
          Sản Phẩm
        </NavItem>
        <NavItem icon={<AlertTriangle size={20} />} to="/hero404">404 page</NavItem>
      </Nav>

      <div className="sidebar-footer">
        <span>Sidebar Footer</span>
      </div>
    </div>
  );
};

export default Sidebar;