// Overlay.jsx
import React from 'react';
import './LogicaP2.css';

const Overlay = ({ isVisible, onClick }) => (
  isVisible ? <div className="overlay" onClick={onClick} aria-hidden="true"></div> : null
);

export default Overlay;
