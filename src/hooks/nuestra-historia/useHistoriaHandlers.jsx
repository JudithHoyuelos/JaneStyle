import React, { useCallback } from "react";

/**
 * @hook useHistoriaHandlers
 * @description Gestiona los eventos del puntero y la interfaz para la historia interactiva.
 *
 * @param {{
 *  cameraDragRef: React.RefObject,
 *  setShowHamburger: (state: boolean) => void,
 *  setShowAlvyButton: (state: boolean) => void,
 *  setShowReturnButton: (state: boolean) => void,
 *  setShowAnimatedText: (state: boolean) => void,
 *  setDisableScroll: (state: boolean) => void,
 *  setIsFadeSidebarOpen: (state: boolean) => void,
 *  isFadeSidebarOpen: boolean,
 *  setText: (text: string) => void
 * }} params
 *
 * @returns {{
 *  handlePointerDown: (e: React.PointerEvent) => void,
 *  handlePointerUp: () => void,
 *  handlePointerMove: (e: React.PointerEvent) => void,
 *  toggleFadeSidebar: () => void,
 *  handleExplorarClick: () => void,
 *  handlePositionChange: (text: string) => void
 * }}
 */
export const useHistoriaHandlers = ({
    cameraDragRef,
    setShowHamburger,
    setShowAlvyButton,
    setShowReturnButton,
    setShowAnimatedText,
    setDisableScroll,
    setIsFadeSidebarOpen,
    isFadeSidebarOpen,
    setText,
    referencePosition,
    setCurrentScene,
}) => {
    const handlePointerDown = useCallback((e) => {
        cameraDragRef.current?.handlePointerDown(e);
    }, [cameraDragRef]);

    const handlePointerUp = useCallback(() => {
        cameraDragRef.current?.handlePointerUp();
    }, [cameraDragRef]);

    const handlePointerMove = useCallback((e) => {
        cameraDragRef.current?.handlePointerMove(e);
    }, [cameraDragRef]);

    const toggleFadeSidebar = useCallback(() => {
        if (isFadeSidebarOpen) {
            setShowHamburger(false);
            setShowAlvyButton(true);
            setShowReturnButton(true);
            setShowAnimatedText(true);
            setDisableScroll(false);
        } else {
            setDisableScroll(true);
        }
        setIsFadeSidebarOpen(prev => !prev);
    }, [
        isFadeSidebarOpen,
        setIsFadeSidebarOpen,
        setShowHamburger,
        setShowAlvyButton,
        setShowReturnButton,
        setShowAnimatedText,
        setDisableScroll
    ]);

    const handleExplorarClick = useCallback(() => {
        setShowHamburger(true);
        setIsFadeSidebarOpen(true);
        setShowAlvyButton(false);
        setShowReturnButton(false);
        setShowAnimatedText(false);
        setDisableScroll(true);
    }, [
        setShowHamburger,
        setIsFadeSidebarOpen,
        setShowAlvyButton,
        setShowReturnButton,
        setShowAnimatedText,
        setDisableScroll
    ]);

    const handlePositionChange = useCallback((newText) => {
        setText(newText);
        const z = newText.z;

        if (z !== undefined) {
            // Normaliza la z para que se mantenga entre 0 y 160
            const wrappedZ = ((z % 160) + 160) % 160;
            const virtualZ = -wrappedZ; // invertimos para mantener lógica original

            let newScene = null;

            if (virtualZ <= 0 && virtualZ > -20) {
                newScene = "escena4";
            } else if (virtualZ <= -40 && virtualZ > -60) {
                newScene = "escena3";
            } else if (virtualZ <= -80 && virtualZ > -100) {
                newScene = "escena2";
            } else if (virtualZ <= -120 && virtualZ > -140) {
                newScene = "escena1";
            }

            // Solo cambia la escena si es distinta a la actual
            setCurrentScene(prev => (prev !== newScene ? newScene : prev));
        }
    }, [setText, setCurrentScene]);

    return {
        handlePointerDown,
        handlePointerUp,
        handlePointerMove,
        toggleFadeSidebar,
        handleExplorarClick,
        handlePositionChange,
    };
};