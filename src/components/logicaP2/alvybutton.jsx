"use client";
import React from "react";

/**
 * Boton que aparece con el video en nuestra historia en las diferentes escena
 *
 * @param {{ onMoveObject: any; }} param0
 * @param {Function} [param0.onMoveObject] - Funcion para mostrarse en los cambios de escena
 * @returns {div} - Boton de explorar de nuestra historia
 */
const AlvyButton = ({ onMoveObject }) => {
  return (
    <div className='alvy-button-container' onClick={onMoveObject}>
      <button className="alvy-button">
        Explorar
      </button>
    </div>
  );
};

export default AlvyButton;