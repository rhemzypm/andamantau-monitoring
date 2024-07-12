import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import SensorChart from '../SensorChart/SensorChart';
import './SensorMonitoring.css';

const SensorMonitoring = () => {
  const [data, setData] = useState({
    suhuAir: [],
    oksigen: [],
    pH: [],
    konduktivitas: [],
  });

  useEffect(() => {
    // Simulasi data fetching
    const interval = setInterval(() => {
      setData((prevData) => ({
        suhuAir: [...prevData.suhuAir, Math.random() * 10 + 20],
        oksigen: [...prevData.oksigen, Math.random() * 5 + 5],
        pH: [...prevData.pH, Math.random() * 2 + 6],
        konduktivitas: [...prevData.konduktivitas, Math.random() * 200 + 800],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sensor-monitoring-page">
      <Navbar />
      <Container component="main" className="sensor-monitoring-container">
        <BackButton />
        <div className="sensor-monitoring-header">
          <div className="sensor-monitoring-title">Monitoring Sensor</div>
          <div className="sensor-monitoring-underline"></div>
        </div>
        <Paper elevation={3} className="sensor-monitoring-paper">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SensorChart title="Suhu Air" data={data.suhuAir} color="rgba(75, 192, 192, 1)" backgroundColor="rgba(75, 192, 192, 0.2)" />
            </Grid>
            <Grid item xs={12} md={6}>
              <SensorChart title="Oksigen" data={data.oksigen} color="rgba(54, 162, 235, 1)" backgroundColor="rgba(54, 162, 235, 0.2)" />
            </Grid>
            <Grid item xs={12} md={6}>
              <SensorChart title="pH Air" data={data.pH} color="rgba(255, 206, 86, 1)" backgroundColor="rgba(255, 206, 86, 0.2)" />
            </Grid>
            <Grid item xs={12} md={6}>
              <SensorChart title="Konduktivitas Elektrik" data={data.konduktivitas} color="rgba(153, 102, 255, 1)" backgroundColor="rgba(153, 102, 255, 0.2)" />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default SensorMonitoring;
