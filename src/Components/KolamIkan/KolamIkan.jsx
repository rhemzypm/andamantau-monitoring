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

  // Template untuk koneksi ke backend (diimplementasikan sesuai kebutuhan)
  /*
  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      // Lakukan fetch data dari backend
      const response = await fetch('https://api.example.com/devices');
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };
  */

  const handleDetailsClick = (deviceId) => {
    console.log(`Details clicked for device with ID ${deviceId}`);
    // Logic Backend Implementasi
    // Misalnya: Redirect ke halaman detail device
    navigate(`/details/${deviceId}`);
  };

  const handleTambahKolamClick = () => {
    navigate('/tambahkolam');
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleDeleteClick = (deviceId) => {
    // Implementasi delete dari backend
    console.log(`Deleting device with ID ${deviceId}`);
    // Template backend untuk penghapusan
    /*
    try {
      const response = await fetch(`https://api.example.com/devices/${deviceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete device');
      }
      setDevices(devices.filter(device => device.id !== deviceId));
    } catch (error) {
      console.error('Error deleting device:', error);
    }
    */
    // Hapus device dari state secara lokal
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
