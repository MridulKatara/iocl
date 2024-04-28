// import React, { useState } from 'react';
// import UserHomePage from './UserHomePage'; // Import the Worker homepage component
// // import AdminHomePage from './AdminHomePage'; // Import the Admin homepage component

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     role: 'admin', // Default role is 'admin'
//   });
//   const [user, setUser] = useState(null); // State to store logged-in user data

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Simulate API call for authentication
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       const { token, role } = await response.json();
//       // Store token and role in local storage
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);
//       // Set user data in state
//       setUser({ role });
//     } else {
//       // Handle authentication error (e.g., display error message)
//       console.error('Login failed.');
//     }
//   };

//   // If user is authenticated, redirect based on role
//   if (user && user.role === 'worker') {
//     return <UserHomePage user={user} />;
//    } //else if (user && user.role === 'admin') {
//   //   return <AdminHomePage user={user} />;
//   // }

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username or Email:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="role">Role:</label>
//           <select
//             id="role"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//           >
//             <option value="admin">Admin</option>
//             <option value="worker">Worker</option>
//           </select>
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;







import React, { useState } from 'react';
import { Navigate   } from 'react-router-dom';
import '../Styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);

  const handleLogin = () => {
    // Mock authentication function
    // You should replace this with actual authentication logic
    if (email === 'admin@example.com' && password === 'admin' && role === 'admin') {
      // Redirect to admin home page
      setRedirectTo('/admin');
    } else if (email === 'worker@example.com' && password === 'worker' && role === 'worker') {
      // Redirect to worker home page
      setRedirectTo('/worker');
    } else {
      // Show error message for invalid credentials
      alert('Invalid email, password, or role.');
    }
  };
  if (redirectTo) {
    return <Navigate to={redirectTo} />; // Use Navigate component instead of Redirect
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
