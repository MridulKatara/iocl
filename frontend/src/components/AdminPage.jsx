// AdminHome.js (Admin home page component)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Admin.css'

const AdminHome = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="admin-home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.jpg" alt="Company Logo" />
        </div>
        <div className="menu">
          <span onClick={toggleMenu}>Employee Name ▼</span>
          {showMenu && (
            <div className="dropdown-menu">
              <Link to="/change-password">Change Password</Link>
              <Link to="/logout">Logout</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="sidebar">
        {/* Left side (User section) */}
        <div className="sidebar-left">
          <h2>User</h2>
          <ul>
            <li><Link to="/create-user">Create New User</Link></li>
            <li><Link to="/edit-user">Edit Existing User</Link></li>
            <li><Link to="/delete-user">Delete Existing User</Link></li>
          </ul>
        </div>

        {/* Right side (Data section) */}
        <div className="sidebar-right">
          <h2>Data</h2>
          <ul>
            <li><Link to="/form-data">Form Data</Link></li>
            <li><Link to="/user-list">User List</Link></li>
          </ul>
        </div>
      </aside>

      {/* Content */}
      {/* Add Content component here */}
    </div>
  );
};

export default AdminHome;
