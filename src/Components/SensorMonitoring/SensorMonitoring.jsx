import React, { useState, useEffect, useCallback } from 'react';
import { Container, Paper, Grid } from '@mui/material';
import axios from 'axios';
import Papa from 'papaparse';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BackButton from '../BackButton/BackButton';
import SensorChart from '../SensorChart/SensorChart';
import './SensorMonitoring.css';

const SensorMonitoring = () => {
  const [data, setData] = useState({
    suhuAir: [],
    oksigen: [],
    pH: [],
    padatanTerlarut: [],
  });

  const navigate = useNavigate();
  const { deviceId } = useParams();

  const processCSV = useCallback((csvData) => {
    const parsedData = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    const suhuAir = [];
    const oksigen = [];
    const pH = [];
    const padatanTerlarut = [];

    parsedData.data.forEach(row => {
      suhuAir.push(row.WaterTemp);
      oksigen.push(row.OxygenLevel);
      pH.push(row.PhLevel);
      padatanTerlarut.push(row.EcLevel);
    });

    setData({ suhuAir, oksigen, pH, padatanTerlarut });
  }, []);

  useEffect(() => {
    const token = Cookies.get();
    if (!token) {
      console.log('No Token found, redirecting to Login');
      navigate('/loginsignup');
      return;
    }

    axios.defaults.withCredentials = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/device/monitor-date-time/${deviceId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        const { data: responseData } = response.data;
        processCSV(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/loginsignup');
        }
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, [deviceId, navigate, processCSV]);

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
              <SensorChart title="Padatan Terlarut" data={data.padatanTerlarut} color="rgba(153, 102, 255, 1)" backgroundColor="rgba(153, 102, 255, 0.2)" />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default SensorMonitoring;