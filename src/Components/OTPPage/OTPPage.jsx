import React, { useState } from 'react';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import './OTPPage.css';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleOtpSubmit = () => {
    // Simulate OTP verification logic (replace with actual OTP verification logic)
    if (otp === '123456') { // contoh doang, seharusnya ini diambil dari email
      setMessage('OTP has been successfully verified.');
      navigate('/inputnewpassword/:userId"'); // Redirect to InputNewPassword page
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-page">
      <Navbar />
      <Container component="main" className="otp-container">
        <BackButton />
        <div className="otp-header">
          <div className="otp-title">Enter OTP</div>
          <div className="otp-underline"></div>
        </div>
        <Paper elevation={3} className="otp-paper">
          <Typography variant="h6" className="otp-info">
            Silahkan masukkan OTP dari email anda.
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoComplete="otp"
            autoFocus
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
          />
          <Button
            variant="contained"
            onClick={handleOtpSubmit}
            className="submit-button"
          >
            Submit OTP
          </Button>
          {message && <Typography variant="body2" className="otp-message">{message}</Typography>}
        </Paper>
      </Container>
    </div>
  );
};

export default OTPPage;
