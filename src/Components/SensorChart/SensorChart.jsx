import React, { useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import Chart from 'chart.js/auto';
import './SensorChart.css';

const SensorChart = ({ title, data, color, backgroundColor }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [{
          label: title,
          data: data,
          borderColor: color,
          backgroundColor: backgroundColor,
        }],
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, title, color, backgroundColor]);

  return (
    <div className="sensor-chart-container">
      <Typography variant="h6" className="sensor-chart-title">{title}</Typography>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default SensorChart;
