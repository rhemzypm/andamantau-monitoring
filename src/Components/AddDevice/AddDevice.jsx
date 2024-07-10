// src/Components/TambahKolam/TambahKolam.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import './AddDevice.css';

const AddDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTambahClick = () => {
    // Logika untuk menambahkan device
    if (deviceName === 'Kolam Terpakai') {
      setMessage('Nama Kolam Sudah Terpakai');
    } else {
      setMessage(''); 
      navigate('/home');
    }
  };

  return (
    <div className="tambah-kolam-page">
      <Navbar />
      <Container component="main" className="tambah-kolam-container">
        <BackButton />
        <div className="tambah-kolam-header">
          <div className="tambah-kolam-title">Tambah Device</div>
          <div className="tambah-kolam-underline"></div>
        </div>
        <Paper elevation={3} className="tambah-kolam-paper">
          <Typography variant="h6" className="tambah-kolam-info">
            ID Device
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="device-name"
            label="Masukkan ID device"
            name="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="tambah-kolam-input"
          />
          <Typography variant="h6" className="tambah-kolam-info">
            Nama Device
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="device-name"
            label="Masukkan nama device"
            name="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="tambah-kolam-input"
          />
          <Button
            variant="contained"
            onClick={handleTambahClick}
            className="tambah-button"
          >
            Tambah
          </Button>
          {message && <Typography variant="body2" className="tambah-kolam-message">{message}</Typography>}
        </Paper>
      </Container>
    </div>
  );
};

export default AddDevice;
