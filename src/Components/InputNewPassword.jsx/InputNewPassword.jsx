import React, { useState } from 'react';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import './InputNewPassword.css';

const InputNewPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (newPassword !== passwordConfirmation) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Submitting:', { new_password: newPassword, password_confirmation: passwordConfirmation, token });

    try {
      const response = await fetch(`http://localhost:3001/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: newPassword,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      console.log('Response:', data);

      if (response.ok) {
        alert('Password reset successful! Redirecting to login...');
        navigate('/loginsignup');
      } else {
        alert(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while resetting the password');
    }
  };

  return (
    <div className="input-new-password-page">
      <Navbar />
      <Container component="main" className="input-new-password-container">
        <div className="input-new-password-header">
          <div className="input-new-password-title">Input New Password</div>
          <div className="input-new-password-underline"></div>
        </div>
        <Paper elevation={3} className="input-new-password-paper">
          <Typography variant="h6" className="input-new-password-info">
            Enter your new password below.
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-new-password-input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
            id="passwordConfirmation"
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="input-new-password-input"
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="submit-new-password-button"
          >
            Submit New Password
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default InputNewPassword;
