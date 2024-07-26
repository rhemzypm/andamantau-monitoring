import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';
import Card from '../Carousel Card/Card';
import BackButton from '../BackButton/BackButton';
import './Home.css';

const Home = () => {
  const [ponds, setPonds] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get();
    if (!token) {
      navigate('/loginsignup');
      return;
    }
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3001/group', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true 
    })
      .then(response => {
        const { data } = response.data; 
        if (Array.isArray(data)) {
          setPonds(data); 
        } else {
        }
      })
      .catch(error => {
        console.error('Error fetching ponds:', error);
        if (error.response && error.response.status === 401) {
          navigate('/loginsignup');
        }
      });
  }, [navigate]);

  const handleDetailsClick = (number_of_device) => {
    navigate(`/kolamikan/${number_of_device}`);
  };

  const handleTambahKolamClick = () => {
    navigate('/tambahkolam');
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleDeleteClick = (number_of_device) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${number_of_device}`)
      .then(() => {
        setPonds(ponds.filter(pond => pond.number_of_device !== number_of_device));
      })
      .catch(error => {
        console.error('Error deleting pond:', error);
      });
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
          <div className="edit-container">
            <button className={`edit-button ${editMode ? 'active' : ''}`} onClick={handleEditClick}>
              {editMode ? 'Done' : 'Edit'}
            </button>
          </div>
          {Array.isArray(ponds) && ponds.map((pond, index) => (
            <Card
              key={index}
              number_of_device={pond.number_of_device}
              group_name={pond.group_name}
              onDetailsClick={() => handleDetailsClick(pond.number_of_device)}
              onDeleteClick={() => handleDeleteClick(pond.number_of_device)}
              editMode={editMode}
            />
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