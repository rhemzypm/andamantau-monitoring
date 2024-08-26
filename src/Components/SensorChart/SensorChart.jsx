import React, { useRef, useEffect } from "react";
import { Typography } from "@mui/material";
import Chart from "chart.js/auto";
import "./SensorChart.css";

const SensorChart = ({
  title,
  data,
  color = "rgba(75, 192, 192, 1)",
  backgroundColor = "rgba(75, 192, 192, 0.2)",
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");


    let yAxisConfig = {
      ticks: {
        callback: (value) => value.toFixed(1), 
      },
    };

    if (title === "pH Level") {
      yAxisConfig = {
        ...yAxisConfig,
        ticks: {
          ...yAxisConfig.ticks,
          stepSize: 1, 
        },
        min: 0, 
        max: 14, 
      };
    } else if (title === "Temperature") {
      yAxisConfig = {
        ...yAxisConfig,
        stepSize: 1,
      };
      
    } else if (title === 'Oxygen Level' || title === 'EC  Level') {
      yAxisConfig = {
        ...yAxisConfig.ticks,
        stepSize: 20,
      };
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [
          {
            label: title,
            data: data,
            borderColor: color,
            backgroundColor: backgroundColor,
          },
        ],
      },
      options: {
        scales: {
          y: yAxisConfig,
        },
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
      <Typography variant="h6" className="sensor-chart-title">
        {title}
      </Typography>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default SensorChart;
