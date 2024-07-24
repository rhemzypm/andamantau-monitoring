import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Settings.css';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    console.log('token:', token); // Log untuk memastikan token terbaca
    if (!token) {
      navigate('/loginsignup');
      return;
    }

    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3001/user', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
      .then(response => {
        setUserInfo({
          name: response.data.name,
          email: response.data.email
        });
      })
      .catch(error => {
        console.error('There was an error fetching the user info!', error);
        if (error.response && error.response.status === 401) {
          navigate('/loginsignup');
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    alert('Anda telah logout!');
    Cookies.remove('Authorization');
    navigate('/loginsignup');
  };

  return (
    <div className="settings-page">
      <BackButton />
      <Container component="main" className="settings-container">
        <div className="settings-header">
          <div className="settings-title">Pengaturan</div>
          <div className="settings-underline"></div>
        </div>
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