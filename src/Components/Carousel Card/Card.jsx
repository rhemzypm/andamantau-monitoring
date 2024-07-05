import React from 'react';
import './Card.css';

const Card = ({ title, description, connectedDevices }) => {
  const handleDetailsClick = () => {
    // Fungsi untuk menghandle klik tombol "Details"
    // Misalnya, navigasi atau pengambilan data dari backend
    console.log(`Details clicked for ${title}`);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{`Connected Devices: ${connectedDevices}`}</p>
        <button onClick={handleDetailsClick}>Details</button>
      </div>
    </div>
  );
};

export default Card;
