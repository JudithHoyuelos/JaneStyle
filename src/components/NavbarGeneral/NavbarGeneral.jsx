import React from 'react';
import * as THREE from "three";
import './NavbarGeneral.css';
import HamburgerButton from "@/components/logicaP2/hamburgesa";
import InicioLogoGeneral from "@/components/logoGeneral/logo";
import ReturnButton from "@/components/logicaP2/returnbutton";
import { useSidebar } from "@/components/Navbar/SidebarContext";

/**
 * Es el Navbar que se usa en informacion y en vender productos.
 * La idea es que sea el que se vea en todas las paguinas
 *
 * @param {{ showReturnButton?: boolean; }} param0
 * @param {boolean} [showReturnButton=true] - Parametro que muestra o no el boton de volver, por defecto siempre se muestra
 * @returns {div} - El Navbar
 */

const NavBarGeneral = ({ showReturnButton = true }) => {

    /** Funciones globales y estados globales del contexto */
    const {
        isSidebarOpen,
        isSidebarCOpen,
        visibilitySidebarMenu,
        closeAllSidebars,
        setTargetPosition,
        setEnableControls,
        setCameraX,
    } = useSidebar();

    /** Funcion que se usa para cerrar los modales y que la cmara vuelva a su pociosion inicial */
    const handleCloseSidebar = () => {
        setTargetPosition(new THREE.Vector3(0, 1.6, 6.5)); // Posición inicial
        setEnableControls(false); // Desactiva los controles

        setTimeout(() => {
            setTargetPosition(null); // Limpia la posición objetivo
            setEnableControls(true); // Reactiva los controles
            setCameraX(0); // Restablece cualquier movimiento lateral
        }, 1000); // Ajusta el tiempo según la duración de la animación
    };

    return (
        <>
            <div className='bar'>
                <div className="volver-container">
                    {showReturnButton && <ReturnButton />}
                </div>
                <div className="logo-container">
                    < InicioLogoGeneral ></InicioLogoGeneral>
                </div>
                <div className="hamburger-container">
                    <HamburgerButton
                        isActive={isSidebarOpen || isSidebarCOpen !== null} // Activo si cualquier sidebar está abierto
                        onClick={() => {
                            if (isSidebarOpen || isSidebarCOpen !== null) {
                                handleCloseSidebar(); // Llama a la función para mover la cámara hacia atrás
                                closeAllSidebars(); // Cierra todos los sidebars
                            } else {
                                visibilitySidebarMenu(); // Abre el sidebar general si está cerrado
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );

}

export default NavBarGeneral;