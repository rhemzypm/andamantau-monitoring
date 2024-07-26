import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ number_of_device, group_name, onDetailsClick, onDeleteClick, editMode }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{group_name}</h2>
        <p>{`Jumlah device: ${number_of_device}`}</p>
        {editMode ? (
          <button className="delete-button" onClick={onDeleteClick}>
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

Card.propTypes = {
  number_of_device: PropTypes.number.isRequired,
  group_name: PropTypes.string.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default Card;
