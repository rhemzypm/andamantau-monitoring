import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CardKolam from '../CardKolam/CardKolam';
import BackButton from '../BackButton/BackButton';
import './KolamIkan.css';

const KolamIkan = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Kolam Ikan 1', status: 'On' },
    { id: 2, name: 'Kolam Ikan 2', status: 'Off' },
    { id: 3, name: 'Kolam Ikan 3', status: 'On' },
  ]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleDetailsClick = (deviceId) => {
    console.log(`Details clicked for device with ID ${deviceId}`);
    // Redirect ke halaman SensorMonitoring untuk device tersebut
    navigate(`/sensor-monitoring/${deviceId}`);
  };

  const handleTambahKolamClick = () => {
    navigate('/tambahkolam');
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleDeleteClick = (deviceId) => {
    console.log(`Deleting device with ID ${deviceId}`);
    // Hapus device dari state
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  return (
    <div className="kolam-ikan-page">
      <Navbar />
      <div className="kolam-ikan-container">
        <div className="kolam-ikan-header">
          <BackButton />
          <div className="kolam-ikan-title">Kolam Ikan Saya</div>
          <div className="kolam-ikan-underline"></div>
        </div>
        <div className="card-container">
          <div className="edit-container">
            <button className={`edit-button ${editMode ? 'active' : ''}`} onClick={handleEditClick}>
              {editMode ? 'Done' : 'Edit'}
            </button>
          </div>
          {devices.map(device => (
            <div key={device.id}>
              <CardKolam
                title={device.name}
                description={`Status: ${device.status}`}
                status={device.status}
                onDetailsClick={() => handleDetailsClick(device.id)}
                onDeleteClick={() => handleDeleteClick(device.id)}
                editMode={editMode}
              />
            </div>
          ))}
          <div className="add-device-container">
            <button className="add-device-button" onClick={handleTambahKolamClick}>
              Tambah Kolam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolamIkan;
