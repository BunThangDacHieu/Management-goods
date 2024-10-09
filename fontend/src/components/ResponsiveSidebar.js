import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { List, X, LayoutDashboard, Table, User, BarChart2, AlertTriangle } from 'lucide-react';
import '../css/Sidebar.css'; 

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
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" exact>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/tables">
            <Table size={20} />
            <span>Tables</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/profile">
            <User size={20} />
            <span>Profile page</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/analytics">
            <BarChart2 size={20} />
            <span>Analytics</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/hero404" target="_blank">
            <AlertTriangle size={20} />
            <span>404 page</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="sidebar-footer">
        <span>Sidebar Footer</span>
      </div>
    </div>
  );
};

export default Sidebar;