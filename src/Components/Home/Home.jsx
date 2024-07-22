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
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
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

  const handleDetailsClick = (umkmDataId) => {
    navigate(`/kolamikan/${umkmDataId}`);
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
          {Array.isArray(ponds) && ponds.map((pond, index) => (
            <Card
              key={index}
              umkmDataId={pond.UmkmDataId}
              group_name={pond.group_name}
              onDetailsClick={() => handleDetailsClick(pond.UmkmDataId)}
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