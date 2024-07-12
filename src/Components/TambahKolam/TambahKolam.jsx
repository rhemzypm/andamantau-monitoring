import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, TextField } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import './TambahKolam.css';

const TambahKolam = () => {
  const [kolamName, setKolamName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTambahClick = () => {
    if (kolamName === 'Kolam Terpakai') {
      setMessage('Nama Kolam Sudah Terpakai');
    } else {
      setMessage('');
      navigate('/kolamikan');
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
