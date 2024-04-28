import React, { useState } from 'react';

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if current password is correct
    // Simulate API call to check current password (replace with actual logic)
    const currentPasswordCorrect = await checkCurrentPassword(formData.currentPassword);

    if (!currentPasswordCorrect) {
      setErrorMessage('Incorrect current password.');
      return;
    }

    // Validation: Check if new password meets requirements
    const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,16}$/;
    if (!newPasswordRegex.test(formData.newPassword)) {
      setErrorMessage('New password must contain at least 8 characters, including a capital letter, a lowercase letter, a number, and a special character.');
      return;
    }

    // Validation: Check if new password matches confirm new password
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    // Simulate API call to change password (replace with actual logic)
    try {
      // const response = await fetch('/api/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   setSuccessMessage(data.message);
      // } else {
      //   setErrorMessage(data.error);
      // }

      // For demo purposes, set success message directly
      setSuccessMessage('Password changed successfully.');
    } catch (error) {
      setErrorMessage('Error changing password. Please try again later.');
    }
  };

  const checkCurrentPassword = async (password) => {
    // Simulate API call to check current password (replace with actual logic)
    // For demo purposes, always return true
    return true;
  };

  return (
    <div className="change-password-page">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
