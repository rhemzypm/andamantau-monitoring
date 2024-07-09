import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CardKolam from '../CardKolam/CardKolam';
import BackButton from '../BackButton/BackButton';
import './KolamIkan.css';

const KolamIkan = () => {
  const [kolams, setKolams] = useState([
    { id: 1, name: 'Kolam Ikan 1', status: 'On' },
    { id: 2, name: 'Kolam Ikan 2', status: 'Off' },
    { id: 3, name: 'Kolam Ikan 3', status: 'On' },
  ]);

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleDetailsClick = (kolamId) => {
    console.log(`Details clicked for kolam with ID ${kolamId}`);
    // Logic Backend Istot
  };

  const handleTambahKolamClick = () => {
    navigate('/tambahkolam');
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleDeleteClick = (kolamId) => {
    setKolams(kolams.filter(kolam => kolam.id !== kolamId));
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
        <div className="edit-container">
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </div>
        <div className="card-container">
          {kolams.map(kolam => (
            <div key={kolam.id}>
              <CardKolam title={kolam.name} description={kolam.status} onDetailsClick={() => handleDetailsClick(kolam.id)} />
              {editMode && <button className="delete-button" onClick={() => handleDeleteClick(kolam.id)}>Delete</button>}
            </div>
          ))}
          <div className="add-device-container">
            <button className="add-device-button" onClick={handleTambahKolamClick}>Tambah Kolam</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolamIkan;
