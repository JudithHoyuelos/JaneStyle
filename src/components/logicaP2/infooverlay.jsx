// InfoOverlay.jsx
import React from 'react';
import './LogicaP2.css';

const InfoOverlay = ({ isVisible }) => (
  isVisible && (
    <div className="info">
      <div className="infoplus">
        <h2>Contacto</h2>
        <p>Info contacto adicional</p>
      </div>
    </div>
  )
);

export default InfoOverlay;
