"use client"
import { createContext, useContext, useState, useRef } from "react";
import * as THREE from "three";

// Crear el contexto
const SidebarContext = createContext();

// Proveedor del contexto
export const SidebarProvider = ({ children, resetCameraToInitialPosition}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del botón hamburguesa
    const [isSidebarCOpen, setIsSidebarCOpen] = useState(null); // Estado del sidebar específico
    const [isFadeSidebarOpen, setIsFadeSidebarOpen] = useState(false);

    // Alternar visibilidad del Sidebar principal
    const visibilitySidebarMenu = () => {
        if (isSidebarOpen) {
            closeAllSidebars();
        } else {
            setIsSidebarOpen(true);
            setIsSidebarCOpen(null); // Cierra cualquier SidebarC
        }
    };

    // Alternar visibilidad del Sidebar específico
    const visibilitySidebarContend = (type) => {
        if (isSidebarCOpen === type) {
            closeAllSidebars(); // Si el tipo ya está abierto, cierra todo
        } else {
            setIsSidebarCOpen(type); // Abre el sidebar específico
            setIsSidebarOpen(true); // Activa el botón hamburguesa
        }
    };

    // Cierra todos los sidebars
    const closeAllSidebars = () => {
        setIsSidebarOpen(false);
        setIsSidebarCOpen(null);

        // Llama a la función de reinicio de la cámara si está definida
        if (resetCameraToInitialPosition) {
            resetCameraToInitialPosition();
        }
    };

    // Funciones específicas para abrir sidebars
    const handleOpenContactSidebar = () => visibilitySidebarContend("contacto");
    const handleOpenChatSidebar = () => visibilitySidebarContend("chatbot");
    const handleOpenPregSidebar = () => visibilitySidebarContend("faq");
    const handleOpenTermiSidebar = () => visibilitySidebarContend("terminos");

    const [targetPosition, setTargetPosition] = useState(null);
    const [targetRotation, setTargetRotation] = useState(null);
    const [enableControls, setEnableControls] = useState(true);
    const [previousPosition, setPreviousPosition] = useState(null);
    const [previousRotation, setPreviousRotation] = useState(null);
    const [cameraX, setCameraX] = useState(0);
    const currentCameraPosition = useRef(new THREE.Vector3(0, 1.6, 5));
    const currentCameraRotation = useRef(new THREE.Euler(0, 0, 0));
    const [isWobbleActive, setIsWobbleActive] = useState(true);

    return (
        <SidebarContext.Provider value={{
            isSidebarOpen,
            isSidebarCOpen,
            visibilitySidebarMenu,
            visibilitySidebarContend,
            closeAllSidebars,
            handleOpenContactSidebar,
            handleOpenChatSidebar,
            handleOpenPregSidebar,
            handleOpenTermiSidebar,
            targetPosition,
            setTargetPosition,
            targetRotation,
            setTargetRotation,
            enableControls,
            setEnableControls,
            previousPosition,
            setPreviousPosition,
            previousRotation,
            setPreviousRotation,
            cameraX,
            setCameraX,
            currentCameraPosition,
            currentCameraRotation,
            isWobbleActive,
            setIsWobbleActive,
            isFadeSidebarOpen, 
            setIsFadeSidebarOpen,
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useSidebar = () => useContext(SidebarContext);