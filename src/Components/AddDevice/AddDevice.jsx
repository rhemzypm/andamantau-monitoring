import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import './AddDevice.css';

const AddDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTambahClick = () => {
    // Logika untuk menambahkan device
    if (deviceName === 'Kolam Terpakai') {
      setMessage('Nama Kolam Sudah Terpakai');
    } else {
      setMessage(''); 
      navigate('/kolamikan'); // Mengarahkan kembali ke halaman KolamIkan
    }
  };

  return (
    <div className="add-device-page">
      <Navbar />
      <Container component="main" className="add-device-container">
        <BackButton />
        <div className="add-device-header">
          <div className="add-device-title">Tambah Device</div>
        </div>
        <div className="add-device-underline"></div>
        <Paper elevation={3} className="add-device-paper">
          <Typography variant="h6" className="add-device-id">
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
            className="add-device-input"
          />
          <Typography variant="h6" className="add-device-id">
            ID Device
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id-device"
            label="Masukkan ID device"
            name="deviceID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="add-device-input"
          />
          <Button
            variant="contained"
            onClick={handleTambahClick}
            className="add-device-button"
          >
            Tambah
          </Button>
          {message && <Typography variant="body2" className="add-device-message">{message}</Typography>}
        </Paper>
      </Container>
    </div>
  );
};

export default AddDevice;
