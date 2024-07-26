import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import axios from 'axios';
import Cookies from 'js-cookie';
import './TambahKolam.css';

const TambahKolam = () => {
  const [kolamName, setKolamName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTambahClick = async () => {
    const token = Cookies.get('token'); 
    if (!token) {
      setMessage('Anda harus login terlebih dahulu');
      navigate('/loginsignup');
      return;
    }
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post('http://localhost:3001/group/create', {
        group_name: kolamName
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (response.status === 200) {
        setMessage('');
        navigate('/home');
      } else {
        setMessage('Kolam sukses ditambahkan');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Unauthorized: Token mungkin tidak valid atau sudah kadaluarsa.');
        navigate('/loginsignup');
      } else if (error.response && error.response.status === 400) {
        setMessage('Nama Kolam Sudah Terpakai');
      } else {
        setMessage('Terjadi kesalahan saat menambahkan kolam.');
      }
    }
  };

  return (
    <div className="tambah-kolam-page">
      <Navbar />
      <Container component="main" className="tambah-kolam-container">
        <BackButton />
        <div className="tambah-kolam-header">
          <div className="tambah-kolam-title">Tambah Kolam</div>
          <div className="tambah-kolam-underline"></div>
        </div>
        <Paper elevation={3} className="tambah-kolam-paper">
          <Typography variant="h6" className="tambah-kolam-name">
            Nama Kolam
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nama-kolam"
            label="Masukkan Nama Kolam"
            name="kolamName"
            value={kolamName}
            onChange={(e) => setKolamName(e.target.value)}
            className="tambah-kolam-input"
          />
          <Button
            variant="contained"
            onClick={handleTambahClick}
            className="tambah-kolam-button"
          >
            Tambah
          </Button>
          {message && <Typography variant="body2" className="tambah-kolam-message">{message}</Typography>}
        </Paper>
      </Container>
    </div>
  );
};

export default TambahKolam;
