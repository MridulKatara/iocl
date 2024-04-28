// CreateUserPage.js

import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/create.css'

const CreateUserPage = () => {
//   const history = useHistory();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    position: '',
    role: '',
    residentialAddress: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user is authenticated
    const isAuthenticated = true; // Implement authentication logic here
    if (!isAuthenticated) {
    //   history.push('/login'); // Redirect to login page if not authenticated
      return;
    }
    // Store the form data in the database based on the role selected
    if (formData.role === 'worker') {
      // Logic to store data for worker role
    } else if (formData.role === 'admin') {
      // Logic to store data for admin role
    }
    // Redirect to homepage after form submission
    // history.push('/');
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <div className="create-user-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Company Logo</Link>
        </div>
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Form */}
      <div className="form-container">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>
          <input type="text" name="residentialAddress" placeholder="Residential Address" value={formData.residentialAddress} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
