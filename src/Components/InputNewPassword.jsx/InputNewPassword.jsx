import React, { useState } from 'react';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import './InputNewPassword.css';

const InputNewPassword = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Kirim data password baru (misalnya dengan API)
    // Setelah berhasil, navigasi ke halaman lain atau beri pesan sukses
    alert('Password reset successful! Redirecting to login...');
    navigate('/login'); // Navigasi ke halaman login setelah reset password
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
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-new-password-input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
