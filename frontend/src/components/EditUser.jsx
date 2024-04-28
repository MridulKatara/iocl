// UserDetailPage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Edit.css'
import axios from 'axios';

const UserDetailPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users'); // Replace '/api/users' with actual backend endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const filterUserData = () => {
    let filteredData = [...userData];
    if (searchTerm) {
      filteredData = filteredData.filter(user => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filter) {
      filteredData = filteredData.filter(user => user.role.toLowerCase() === filter.toLowerCase());
    }
    return filteredData;
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filterUserData().slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (userId) => {
    navigate(`/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    navigate(`/delete/${userId}`);
  };
  return (
    <div className="user-detail-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Company Logo</Link>
        </div>
        <div className="logout">
          <button>Logout</button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className='main'>
      <div className="sidebar">
        <h2>Filters</h2>
        <div className="filters">
          <label>
            Role:
            <select value={filter} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="worker">Worker</option>
            </select>
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="content-container">
      <h2>User Details</h2>
        {/* Search bar */}
        <div className='search-bar'>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
        </div>
        {/* User data */}
        <div className="user-list">
          {currentUsers.map((user) => (
            <div key={user.id} className="user-item">
              <div>{user.fullName}</div>
              <div>{user.role}</div>
              <div>{user.position}</div>
              <div>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
        <ul className="pagination">
          {filterUserData().length > usersPerPage && (
            Array.from({ length: Math.ceil(filterUserData().length / usersPerPage) }).map((_, index) => (
              <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDetailPage;
