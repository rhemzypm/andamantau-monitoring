import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Card from '../Carousel Card/Card';
import BackButton from '../BackButton/BackButton';
import './Home.css';

const Home = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Device 1', description: 'Ini adalah deskripsi dari device 1.' },
    { id: 2, name: 'Device 2', description: 'Ini adalah deskripsi dari device 2.' },
    { id: 3, name: 'Device 3', description: 'Ini adalah deskripsi dari device 3.' },
  ]);

  const handleDetailsClick = (deviceId) => {
    console.log(`Details clicked for device with ID ${deviceId}`);
    //Logic Backend Istot
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <BackButton />
          <div className="home-title">Device Saya</div>
          <div className="home-underline"></div>
        </div>
        <div className="card-container">
          {devices.map(device => (
            <Card key={device.id} title={device.name} description={device.description} onDetailsClick={() => handleDetailsClick(device.id)} />
          ))}
          <div className="add-device-container">
            <button className="add-device-button">Add Device</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
