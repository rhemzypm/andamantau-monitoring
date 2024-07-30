import React from 'react';
import PropTypes from 'prop-types';
import './CardKolam.css';

const CardKolam = ({ title, description, status, onDetailsClick, onDeleteClick, editMode }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {editMode ? (
          <button className="delete-button delete-button-edit" onClick={onDeleteClick}>
            Delete
          </button>
        ) : (
          <button className="details-button" onClick={onDetailsClick}>
            Details
          </button>
        )}
      </div>
    </div>
  );
};

CardKolam.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired, 
  onDetailsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default CardKolam;
