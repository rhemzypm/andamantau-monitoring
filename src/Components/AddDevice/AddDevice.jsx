import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import './AddDevice.css';

const AddDevice = () => {
  const { ID } = useParams();
  const [deviceName, setDeviceName] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTambahClick = async () => {
    try {
      const token = Cookies.get();
      const response = await axios.post(`http://localhost:3001/device/register/${deviceID}`, {
        name: deviceName,
        group_id: ID
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setMessage('Device berhasil didaftarkan dan ditambahkan ke kolam');
        navigate('/home');
      } else {
        setMessage('Gagal mendaftarkan device');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        setMessage(`Gagal: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setMessage('Tidak ada respon dari server. Cek koneksi Anda.');
      } else {
        console.error('Error setting up request:', error.message);
        setMessage('Terjadi kesalahan saat mengirim permintaan');
      }
    }
  };

  return (
    <div className="add-device-page">
      <Navbar />
      <Container component="main" className="add-device-container">
        <BackButton />
        <div className="add-device-header">
          <div className="add-device-title">Tambah Device Baru</div>
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
            Tambah Device
          </Button>
          {message && <Typography variant="body2" className="add-device-message">{message}</Typography>}
        </Paper>
      </Container>
    </div>
  );
};

export default AddDevice;
