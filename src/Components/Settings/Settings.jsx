import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import Navbar from '../Navbar/Navbar'; 
import axios from 'axios';
import './Settings.css';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get('https://example.com/api/userinfo')
      .then(response => {
        setUserInfo({
          name: response.data.name,
          email: response.data.email
        });
      })
      .catch(error => {
        console.error('There was an error fetching the user info!', error);
      });
  }, []);

  const handleLogout = () => {
    alert('Anda telah logout!');
  };

  return (
    <div className="settings-page">
      <Container component="main" className="settings-container">
        <div className="home-title">Device Saya</div>
        <Paper elevation={3} className="settings-paper">
          <Typography variant="h6" className="settings-info">
            Nama Pengguna: {userInfo.name}
          </Typography>
          <Typography variant="h6" className="settings-info">
            Email: {userInfo.email}
          </Typography>
          <Button
            variant="contained"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </Paper>
      </Container>
      <Navbar /> 
    </div>
  );
};

export default Settings;
