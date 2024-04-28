import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserHomePage from './components/UserHomePage';
import ChangePasswordPage from './components/ChangePasswordPage';
import AdminHomePage from './components/AdminPage';
import CreateUserPage from './components/createNewUser';
import EditUserPage from './components/EditUser';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/worker" element={<UserHomePage/>} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/admin/*" element={<AdminHomePage isAuthenticated={true}/>} />
          <Route path="/create-user" element={<CreateUserPage/>} />
          <Route path="/edit-user" element={<EditUserPage/>} />
          <Route path="/delete-user" element={<EditUserPage/>} />
          {/* <Route path="/create-user" element={<CreateUserPage/>} /> */}
          <Route path="/user-list" element={<EditUserPage/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
