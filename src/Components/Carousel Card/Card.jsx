import React from 'react';
import './Card.css';

const Card = ({ umkmDataId, group_name, onDetailsClick }) => {
  console.log('Card props:', { umkmDataId, group_name });

  return (
    <div className="card">
      <div className="card-content">
        <h2>{group_name}</h2>
        <p>{`UmkmDataId: ${umkmDataId}`}</p>
        <button onClick={onDetailsClick}>Details</button>
      </div>
    </div>
  );
};

export default Card;
