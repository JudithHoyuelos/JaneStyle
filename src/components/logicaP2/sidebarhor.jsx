// Sidebar.jsx
import React from 'react';
import './LogicaP2.css';

/**
 * Es el menu que sale desde arriba en la landing y en nuestra historia.
 * Recibe el contenido que se muestra por parametros
 *
 * @param {{ isOpen: any; className: any; onClose: any; onOpenSidebarC: any; children: any; }} param0
 * @param {boolean} [param0.isOpen] - Estado para ver si esta abierto
 * @param {string} [param0.className] - Nombre de la clase 
 * @param {Object} [param0.children] - El contenido que se muestra
 * @returns {Object}
 */

const SidebarLanding = ({ isOpen, className, onClose, onOpenSidebarC, children }) => (
  <div className={`${isOpen ? "open" : ""} ${className}`}>
    {children}
  </div>
);


export default SidebarLanding;
