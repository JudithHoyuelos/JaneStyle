// Hotspot.jsx
import React from 'react';

const Hotspot = ({ onClick, onMouseEnter, onMouseLeave }) => (
  <div
    className="hotspot"
    onClick={onClick}
    onMouseEnter={onMouseEnter}  // Usamos el evento de entrada del mouse
    onMouseLeave={onMouseLeave}  
    role="button"
    tabIndex={0}
  >
    {/* Aquí va el contenido de tu hotspot */}
  </div>
);

export default Hotspot;
