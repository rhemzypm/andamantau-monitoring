import React from 'react';
import PropTypes from 'prop-types';
import './CardKolam.css';

const Card = ({ title, status, onDetailsClick }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-status">{status ? 'On' : 'Off'}</p>
        <button className="details-button" onClick={onDetailsClick}>Details</button>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
};

export default Card;
