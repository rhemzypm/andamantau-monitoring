// src/Components/ForgotPassword/ForgotPassword.jsx
import React, { useState } from 'react';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailSubmit = () => {
    // Kirim email (misalnya dengan API)
    // Setelah email terkirim, navigasi ke halaman OTPPage
    navigate('/otp'); // Navigate to OTPPage
  };

  return (
    <div className="forgot-password-page">
      <Navbar />
      <Container component="main" className="forgot-password-container">
        <div className="forgot-password-header">
          <div className="forgot-password-title">Forgot Password</div>
          <div className="forgot-password-underline"></div>
        </div>
        <Paper elevation={3} className="forgot-password-paper">
          <Typography variant="h6" className="forgot-password-info">
            Enter your email address to receive a password reset link.
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
          />
          <Button
            variant="contained"
            onClick={handleEmailSubmit}
            className="submit-email-button"
          >
            Submit Email
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
