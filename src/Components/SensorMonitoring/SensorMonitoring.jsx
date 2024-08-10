import React, { useState, useEffect, useCallback } from 'react';
import { Container, Paper, Grid, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
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

  const [selectedDate, setSelectedDate] = useState(''); 
  const [selectedInterval, setSelectedInterval] = useState(''); 

  const navigate = useNavigate();
  const { deviceId } = useParams();

  const processCSV = useCallback((csvData) => {
    console.log("Raw CSV Data:", csvData);

    const rows = csvData.split('\n').filter(row => row); 
    console.log("CSV Rows:", rows);

    const dataRows = rows.slice(1).map(row => row.split(','));
    console.log("Data Rows:", dataRows);

    const suhuAir = [];
    const oksigen = [];
    const pH = [];
    const padatanTerlarut = [];

    dataRows.forEach(row => {
      console.log("Current Row:", row);

      oksigen.push(parseFloat(row[0])); 
      suhuAir.push(parseFloat(row[1])); 
      padatanTerlarut.push(parseFloat(row[2])); 
      pH.push(parseFloat(row[3])); 

      console.log("Oxygen Level Array:", oksigen);
      console.log("Water Temperature Array:", suhuAir);
      console.log("EC Level Array:", padatanTerlarut);
      console.log("pH Level Array:", pH);
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
        const date = selectedDate === '' ? new Date().toISOString() : new Date(selectedDate).toISOString();

        const payload = {
          device_id: deviceId,
          date: date,
          interval: selectedInterval
        };

        console.log("Payload:", payload);

        const response = await axios.post(`http://localhost:3001/device/monitor-date-time`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [deviceId, navigate, processCSV, selectedDate, selectedInterval]);

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
              <TextField
                label="Select Date"
                type="datetime-local"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Select Interval"
                value={selectedInterval}
                onChange={(e) => setSelectedInterval(e.target.value)}
                fullWidth
              >
                <MenuItem value="">Now</MenuItem>
                <MenuItem value="5m">5 minutes</MenuItem>
                <MenuItem value="10m">10 minutes</MenuItem>
                <MenuItem value="15m">15 minutes</MenuItem>
                <MenuItem value="20m">20 minutes</MenuItem>
                <MenuItem value="25m">25 minutes</MenuItem>
                <MenuItem value="30m">30 minutes</MenuItem>
              </TextField>
            </Grid>
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
