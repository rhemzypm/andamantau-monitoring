import React from 'react';
import './Card.css';

const Card = ({ number_of_device, group_name, onDetailsClick }) => {
  console.log('Card props:', { number_of_device, group_name });

  return (
    <div className="card">
      <div className="card-content">
        <h2>{group_name}</h2>
        <p>{`jumlah device: ${number_of_device}`}</p>
        <button onClick={onDetailsClick}>Details</button>
      </div>
    </div>
  );
};

export default Card;
