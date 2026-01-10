'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './LogicaP2.css';

/**
 * Se crea el boton para volver, con los estados para que se muestre.
 * Ademas de una funcion para que si el usuario confirma vulva a la landing
 *
 * @returns {div} - El boton para volver
 */

const ReturnButton = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleConfirmExit = () => {
    setShowModal(false);
    router.push('/');
  };

  const handleOpenModal = () => setShowModal(true);

  const handleCancel = () => setShowModal(false);

  return (
    <>
    <div className='bg-black bg-opacity-50 fixed top-10 left-6 z-50 p-2 rounded-full volver' >
      <button className=" text-white" onClick={handleConfirmExit}>
        Volver
      </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Seguro que quieres volver al inicio?</p>
            <button className="confirm-button" onClick={handleConfirmExit}>
              Salir
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnButton;