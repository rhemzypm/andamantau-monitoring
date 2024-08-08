import React, { useState } from 'react';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleEmailSubmit = async () => {
    try {
      // Kirim request ke API 
      const response = await fetch(`http://localhost:3001/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setError('');
        window.alert('Email berhasil dikirim');
        navigate('/loginsignup');
      } else {
        setError(data.message || 'Failed to send reset link');
        window.alert('Email tidak terdaftar');
      }
    } catch (error) {
      setError('An error occurred while sending the email');
      window.alert('Terjadi kesalahan saat mengirim email');
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgot-password-page">
      <Container component="main" className="forgot-password-container">
      <BackButton />
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
