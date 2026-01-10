"use client";
import React, { useState } from "react";
import "./Sidebar.css"

/**
 * Es el contenido que se muestra cuando le das al boton de explorar.
 * Por defecto muestra el contenido que le pasan con el componente ContenidoHistoria,
 *  en caso que se haya selccionado un circulo se muestra el contedido
 * de este componente. Se le pasas los parametros para abrir y cerrarlo, a parte 
 * del nuemero del circulo. 
 *
 * @param {{ isOpen: any; onClose: any; selectedCircle: any; onReset: any; children: any; }} param0
 * @param {boolean} [param0.isOpen] - Estado para mostrar
 * @param {boolean} [param0.onClose] - Estado para cerrar
 * @param {number} [param0.selectedCircle] - Circulo seleccionado
 * @param {boolean} [param0.onReset] - 
 * @param {Object} [param0.children] - Contenido del hijo
 * @returns {div} - Contenido de los circulos seleccionados
 */
const FadeSidebar = ({ isOpen, onClose, selectedCircle, onReset, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="relative rounded-lg w-3/4 h-3/4 flex justify-center items-center bg-opacity-0 bg-black mt-12">
        {/* Si hay un círculo seleccionado, mostrarlo con texto */}
        {selectedCircle ? (
          <div className="flex w-full h-full items-center contenedor-grande">
            {/* Círculo seleccionado a la izquierda */}
            <div className="w-1/3 flex justify-center contenedor-imagen">
              <div className="rounded-full border border-white p-1 bg-transparent">
                <div className={`w-48 h-48 bg-center bg-cover rounded-full ${!selectedCircle.image ? selectedCircle.color : ''} imagen-circulo`}
                  style={{
                    backgroundImage: selectedCircle.image ? `url(${selectedCircle.image})` : "none",
                  }}></div>
              </div>
            </div>

            {/* Texto a la derecha */}
            <div className="w-2/3 flex justify-center text-white contenedor-texto">
              <h2 className="text-3xl font-bold mb-4 titulo">{selectedCircle.title}</h2>
              <p className="text-lg">{selectedCircle.text}</p>
              {/* <p className="text-lg mt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, harum! 
                Deserunt, sed, corrupti quisquam iusto dolore eligendi unde numquam praesentium 
                quos consequuntur, cumque in. Quod, tenetur. Aut eligendi sit libero.
              </p> */}

              {/* Botón para volver */}
              <button
                className="mt-5 px-4 py-2 bg-foundation-1 text-white rounded-lg w-48 max-w-[8rem] sm:max-w-[9rem] md:max-w-[10rem]"
                onClick={onReset}
              >
                Volver
              </button>
            </div>
          </div>
        ) : (
          // Si no hay un círculo seleccionado, muestra el contenido que venga  de `children`
          <div className="w-full h-full">{children}</div>
        )}

        {/* Botón para cerrar el Sidebar */}
        {/* <button className="absolute top-5 right-5 text-gray-800 text-2xl" onClick={onClose}>
          ✖
        </button> */}
      </div>
    </div>
  );
};

export default FadeSidebar;
