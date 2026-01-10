// HamburgerButton.jsx
import React from 'react';
import './HamburgerButton.css';

/**
 * Es el boton que aparece en todas las paguinas para desplegar el menu. 
 * Sirve para abrir y cerrar el modal del menu correspondiente.
 *
 * @param {{ isActive: any; onClick: any; }} param0
 * @param {boolean} [isActive] - Controla si se abre o se cierra
 * @param {Function} [onClick] - La funcion para abrir o cerrar el modal
 * @returns {div} - Boton del menu
 */

const HamburgerButton = ({ isActive, onClick }) => (
  <div
    className={`hamburger-btn ${isActive ? "open" : ""} `}
    // id="hamburger-btn"
    onClick={onClick}
    aria-label="Toggle sidebar"
  >
    <div className="menuBtn__burger"></div>
  </div>
);

export default HamburgerButton;
