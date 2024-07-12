import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import './AddDevice.css';

const AddDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTambahClick = () => {
    if (deviceName === 'Kolam Terpakai') {
      setMessage('Nama Kolam Sudah Terpakai');
    } else {
      setMessage('');
      navigate('/home');
    }
  };

  return (
    <div className="add-device-page">
      <Navbar />
      <Container component="main" className="add-device-container">
        <BackButton />
        <div className="add-device-header">
          <div className="add-device-title">Tambah Device</div>
          <div className="add-device-underline"></div>
        </div>
        <Paper elevation={3} className="add-device-paper">
          <Typography variant="h6" className="add-device-id">
            Nama Device
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nama-device"
            label="Masukkan Nama Device"
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
            label="Masukkan ID Device"
            name="deviceID"
            value={deviceID}
            onChange={(e) => setDeviceID(e.target.value)}
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
