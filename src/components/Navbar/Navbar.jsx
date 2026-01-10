import React from 'react';
import * as THREE from "three";
import './Navbar.css';
import HamburgerButton from "@/components/logicaP2/hamburgesa";
import InicioLogo from "@/components/logo/logo";
import ReturnButton from "@/components/logicaP2/returnbutton";
import { useSidebar } from "@/components/Navbar/SidebarContext";

/**
 * Es el Navbar que se usa en informacion y en nuestra historia.
 *
 * @param {{ title: any; showReturnButton?: boolean; }} param0
 * @param {string} [title] - Titulo de la paguina donde estas
 * @param {boolean} [showReturnButton=true] - Parametro que muestra o no el boton de volver, por defecto siempre se muestra
 * @returns {div} - El Navbar
 */

const NavBar = ({ title, showReturnButton = true }) => {

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
                {showReturnButton && <ReturnButton />}
                < InicioLogo title={title} ></InicioLogo>
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
        </>
    );

}

export default NavBar;