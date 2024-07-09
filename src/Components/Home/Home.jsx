import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Card from '../Carousel Card/Card';
import BackButton from '../BackButton/BackButton';
import './Home.css';

const Home = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Kolam 1', description: 'Ini adalah deskripsi dari Kolam 1.' },
    { id: 2, name: 'Kolam 2', description: 'Ini adalah deskripsi dari Kolam 2.' },
    { id: 3, name: 'Kolam 3', description: 'Ini adalah deskripsi dari Kolam 3.' },
  ]);

  const navigate = useNavigate();

  const handleDetailsClick = (deviceId) => {
    console.log(`Details clicked for device with ID ${deviceId}`);
    // Logic Backend Istot
  };

  const handleTambahKolamClick = () => {
    navigate('/tambahkolam');
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <BackButton />
          <div className="home-title">Kolam Saya</div>
          <div className="home-underline"></div>
        </div>
        <div className="card-container">
          {devices.map(device => (
            <Card key={device.id} title={device.name} description={device.description} onDetailsClick={() => handleDetailsClick(device.id)} />
          ))}
          <div className="add-device-container">
            <button className="add-device-button" onClick={handleTambahKolamClick}>Tambah Kolam</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
