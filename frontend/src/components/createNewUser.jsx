import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios library
import '../Styles/create.css';

const CreateUserPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend endpoint
      const response = await axios.post('http://localhost:5000/users/signup', formData);

      // Clear the form after successful submission
      setFormData({
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

      // Handle successful submission (e.g., show success message)
      console.log('User created successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error('Error creating user:', error);
    }
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
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="createText"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="createEmail"
          />
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
            className="createText"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="createSelect"
          >
            <option value="">Select Role</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            name="residentialAddress"
            placeholder="Residential Address"
            value={formData.residentialAddress}
            onChange={handleChange}
            required
            className="createText"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="createSelect"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="createPassword"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="createPassword"
          />
          <button type="submit" className="createSubmit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
