"use client"
import { createContext, useContext, useState } from "react";

// Crear el contexto
const SidebarContext = createContext();

// Proveedor del contexto
export const SidebarProviderLandig = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del botón hamburguesa
    const [isSidebarCOpen, setIsSidebarCOpen] = useState(null); // Estado del sidebar específico
    const [isSidebarhmOpen, setIsSidebarhmOpen] = useState(false);

    const visibilitySidebarMenuLanding = () => {
        setIsSidebarhmOpen((prev) => !prev);
        if (!isSidebarhmOpen) {
            moveCamera(); // Mover la cámara hacia arriba
        } else {
            moveCamera(false); // Llama a moveCamera para bajar la cámara.
        }
    };

    const visibilitySidebarContend = () => setIsSidebarCOpen((prev) => !prev);

    const closeAllSidebars = () => {
        setIsSidebarhmOpen(false);
        setIsSidebarCOpen(false);
        moveCamera(false);
    };

    const handleLinkClick = (callback) => {
        setIsSidebarhmOpen(false);
        if (callback) callback();
    };

    const moveCamera = (isOpening) => {
        setCameraTargetY(isOpening ? 7 : 2);
        setIsAnimating(true);
    };

    const [cameraTargetY, setCameraTargetY] = useState(2);
    const [isAnimating, setIsAnimating] = useState(false);

    return (
        <SidebarContext.Provider value={{
            isSidebarOpen,
            isSidebarCOpen,
            isSidebarhmOpen,
            visibilitySidebarContend,
            closeAllSidebars,
            visibilitySidebarMenuLanding,
            handleLinkClick,
            moveCamera,
            cameraTargetY,
            isAnimating,
            setCameraTargetY,
            setIsAnimating,
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useSidebarLanding = () => useContext(SidebarContext);