import React from 'react';
import { useSidebar } from "@/components/Navbar/SidebarContext";
import * as THREE from "three";

/**
 * Es el menu interactivo que hay en la paguina de informacion.
 *
 * @returns {div} - Informacion para el menu 
 */

const MenuInfo = () => {

    /** Funciones globales y estados globales del contexto */
    const {
        handleOpenContactSidebar,
        handleOpenChatSidebar,
        handleOpenPregSidebar,
        handleOpenTermiSidebar,
        targetPosition,
        setTargetPosition,
        setTargetRotation,
        setEnableControls,
        previousPosition,
        setPreviousPosition,
        previousRotation,
        setPreviousRotation,
        currentCameraPosition,
        currentCameraRotation,
        setIsWobbleActive,
    } = useSidebar();

    /**
     * Funcion que se encarga de almacenar la posicion incial de la camara,
     * la posicion a la que se tenien que mover la camara, de activar y 
     * desactivar los controles cuando se mueve la camara y de activar o 
     * desactivar el efecto de wobble.
     *
     * @param {Vector3} [position] - Es la posicion en la que esta la camara
     * @param {Vector3} [rotation] - Es la rotacion que tiene la camara
     */
    const handleCubeClick = (position, rotation) => {
        if (targetPosition && targetPosition.equals(position)) {
          // Si el objetivo ya está alcanzado, regresa a la posición inicial
          setTargetPosition(previousPosition || new THREE.Vector3(0, 1.6, 10));
          setTargetRotation(previousRotation || new THREE.Euler(0, 0, 0));
          setTimeout(() => {
            setTargetPosition(null);
            setTargetRotation(null);
            setEnableControls(true); // Reactiva el control dinámico
          }, 3000);
        } else {
          // Guarda la posición actual antes de cambiar
          setPreviousPosition(new THREE.Vector3().copy(currentCameraPosition.current));
          setPreviousRotation(new THREE.Euler().copy(currentCameraRotation.current));
          setIsWobbleActive(false); // Pausar el wobble
    
          setTargetPosition(position);
          setTargetRotation(rotation);
          setEnableControls(false); // Desactiva el control dinámico temporalmente
    
          // Vuelve a activar el control dinámico después de enfocar
          setTimeout(() => {
            setEnableControls(true);
          }, 3000); // Ajusta según la duración de la animación
        }
      };

    return (
        <>
            <ul className="lista">
                <li>
                    <button
                        onClick={() => {
                            handleCubeClick(
                                new THREE.Vector3(4.5, 1.65, 5.3), // Posición del modelo "Contacto"
                                new THREE.Euler(0, Math.PI / 0.005, 0) // Rotación deseada
                            );
                            handleOpenContactSidebar(); // Abre el sidebar "Contacto"
                        }}
                    >
                        Contacto
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            handleCubeClick(
                                new THREE.Vector3(1.9, 1, 3.5), // Posición del modelo "Preguntas Frecuentes"
                                new THREE.Euler(0, Math.PI / 2, 0) // Rotación deseada
                            );
                            handleOpenPregSidebar(); // Abre el sidebar "Preguntas Frecuentes"
                        }}
                    >
                        Preguntas Frecuentes
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            handleCubeClick(
                                new THREE.Vector3(3.6, 1, 3.4), // Posición del modelo "Chatbot"
                                new THREE.Euler(0, Math.PI / 1.5, 0) // Rotación deseada
                            );
                            handleOpenChatSidebar(); // Abre el sidebar "Chatbot"
                        }}
                    >
                        Alvy AI
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            handleCubeClick(
                                new THREE.Vector3(-0.7, 1, 3), // Posición del modelo "Términos y Condiciones"
                                new THREE.Euler(0, Math.PI / 3, 0) // Rotación deseada
                            );
                            handleOpenTermiSidebar(); // Abre el sidebar "Términos y Condiciones"
                        }}
                    >
                        Términos y Condiciones
                    </button>
                </li>
            </ul>
        </>
    );
}

export default MenuInfo;