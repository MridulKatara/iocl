import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/login.css' 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);

  const handleLogin = async () => {
    try {
      // Send a POST request to the backend endpoint
      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });

      // If authentication is successful, redirect to appropriate page based on role
      if (response.status === 200) {
        if (role === 'admin') {
          setRedirectTo('/admin');
        } else if (role === 'worker') {
          setRedirectTo('/worker');
        }
      }
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication error:', error);
      alert('Invalid email, password, or role.');
    }
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div className="login-container">
      <h2 style={{ color: 'white' }}>Sign In</h2>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="loginEmail"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="loginPassword"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='loginSelect'
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="worker">Worker</option>
        </select>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
