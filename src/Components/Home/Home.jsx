import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-title">Device Saya</div>
        <div className="home-underline"></div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
