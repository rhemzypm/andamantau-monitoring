import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';
import CardKolam from '../CardKolam/CardKolam';
import BackButton from '../BackButton/BackButton';
import './KolamIkan.css';

const KolamIkan = () => {
  const [devices, setDevices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { ID } = useParams(); // Ensure this matches the route parameter name

  useEffect(() => {
    const token = Cookies.get(); // Ensure this matches the cookie name
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/loginsignup');
      return;
    }

    console.log(`Fetching data for group ID: ${ID}`);
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3001/group/${ID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true 
    })
      .then(response => {
        console.log('API response:', response);
        const { data } = response.data;
        if (Array.isArray(data)) {
          setDevices(data); 
        } else {
          console.error('Data received is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
        if (error.response && error.response.status === 401) {
          navigate('/loginsignup');
        }
      });
  }, [ID, navigate]);

  const handleDetailsClick = (deviceId) => {
    console.log(`Details clicked for device with ID ${deviceId}`);
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
    // Delete device from state
    setDevices(devices.filter(device => device.id !== deviceId));

    // Optionally, you can also delete the device from the server
    axios.delete(`http://localhost:3001/device/${deviceId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    }).catch(error => {
      console.error('Error deleting device:', error);
    });
  };

  return (
    <div className="kolam-ikan-page">
      <Navbar />
      <div className="kolam-ikan-container">
        <div className="kolam-ikan-header">
          <BackButton />
          <div className="kolam-ikan-title">Kolam Ikan Saya</div> //perbaiki fetch nama kolam dari API
          <div className="kolam-ikan-underline"></div>
        </div>
        <div className="card-container">
          <div className="edit-container">
            <button className={`edit-button ${editMode ? 'active' : ''}`} onClick={handleEditClick}>
              {editMode ? 'Done' : 'Edit'}
            </button>
          </div>
          {devices.map(device => (
            <div key={device.id}> //data device belum ter fetch
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
