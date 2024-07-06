import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button className="back-button" onClick={handleGoBack}>
      <ArrowBackIcon />
    </button>
  );
};

export default BackButton;
