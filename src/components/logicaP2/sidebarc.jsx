import React from 'react';
import Sidebar from './sidebar.jsx';  // Importa el componente base
import './LogicaP2.css';

/**
 * Es el menu lateral de la paguina de informcacion que sale a la derecha.
 * Contine la informacion de cada punto caliente que hay, de contactos, 
 * preguntas frecuentes, alvy y terminos y condiciones
 * Recibe el contenido que se muestra por parametros
 *
 * @param {{ isOpen: any; onClose: any; onOpenSidebarC: any; children: any; }} param0
 * @param {boolean} [param0.isOpen] - Estado para ver si esta abierto
 * @param {Object} [param0.children] - El contenido que se muestra
 * @returns {Object}
 */

const SidebarConted = ({  isOpen, onClose, onOpenSidebarC, children }) => (
  <div className={`sidebarc ${isOpen ? "open" : ""}`}>
    {children}
  </div>
);

export default SidebarConted;
