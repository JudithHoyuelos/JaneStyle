"use client";
import React from "react";

/**
 * Es el boton que aparece en el fadesidebar en nuestra historia cuando
 * este esta visible. Sirve para cerrar el modal.
 *
 * @param {{ isActive: any; onClick: any; }} param0
 * @param {boolean} [isActive] - Controla si se muestra o no
 * @param {Function} [onClick] - La funcion para cerrar el modal
 * @returns {botton} - Boton que sale en el fadesidebar
 */

const NewHamburgerButton = ({ isActive, onClick }) => {
  return (
    <button
      className={`hamburger-btn ${isActive ? "active" : ""} fixed top-5 left-5 z-50 bg-black bg-opacity-50 text-white p-3 rounded-full`}
      id="hamburger-btn"
      onClick={onClick}
      aria-label="Toggle sidebar"
    >
      ✖
    </button>
  );
};

export default NewHamburgerButton;
