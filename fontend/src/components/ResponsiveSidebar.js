import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { List, X, LayoutDashboard, Table, User, BarChart2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
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
        <span className="sidebar-title">Sidebar</span>
      </div>

      <Nav className="flex-column sidebar-content">
        <NavItem icon={<LayoutDashboard size={20} />} to="/">Dashboard</NavItem>
        <NavItem icon={<Table size={20} />} to="/tables">Tables</NavItem>
        <NavItem 
          icon={<User size={20} />} 
          subItems={[
            { to: "/profile", label: "View Profile", icon: <User size={16} /> },
            { to: "/settings", label: "Settings", icon: <BarChart2 size={16} /> }
          ]}
        >
          User
        </NavItem>
        <NavItem icon={<BarChart2 size={20} />} to="/analytics">Analytics</NavItem>
        <NavItem icon={<AlertTriangle size={20} />} to="/hero404">404 page</NavItem>
      </Nav>

      <div className="sidebar-footer">
        <span>Sidebar Footer</span>
      </div>
    </div>
  );
};

export default Sidebar;