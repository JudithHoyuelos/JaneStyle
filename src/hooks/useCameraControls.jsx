// CameraControls.js
import React, { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * @component CameraInertia
 * @description Aplica inercia al movimiento de la cámara cuando no se está arrastrando.
 * @param {Object} props
 * @param {React.MutableRefObject<THREE.Camera>} props.cameraRef - Referencia a la cámara.
 * @param {React.MutableRefObject<{x: number, y: number}>} props.velocityRef - Velocidad actual del movimiento.
 * @param {boolean} props.isDragging - Indica si el usuario está arrastrando.
 * @returns {null}
 */
export function CameraInertia({ cameraRef, velocityRef, isDragging }) {
  const frictionFactor = 0.95;

  useFrame(() => {
    if (!isDragging && cameraRef.current) {
      cameraRef.current.position.x -= velocityRef.current.x;
      velocityRef.current.x *= frictionFactor;
      if (Math.abs(velocityRef.current.x) < 0.001) velocityRef.current.x = 0;
    }
  });

  return null;
}

/**
 * @hook useCameraControls
 * @description Hook que gestiona el control de cámara con arrastre e inercia.
 * @returns {Object} Controles y referencias para gestionar el movimiento de la cámara.
 */
export function useCameraControls() {
  const cameraRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  /**
 * @function handlePointerDown
 * @description Inicia el arrastre registrando la posición del mouse.
 * @param {MouseEvent} event
 */
  const handlePointerDown = useCallback((event) => {
    setIsDragging(true);
    lastMousePositionRef.current = { x: event.clientX, y: event.clientY };
  }, []);

  /**
 * @function handlePointerUp
 * @description Finaliza el arrastre.
 */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /**
 * @function handlePointerMove
 * @description Actualiza la posición de la cámara durante el arrastre.
 * @param {MouseEvent} event
 */
  const handlePointerMove = useCallback((event) => {
    if (isDragging && cameraRef.current) {
      const deltaX = event.clientX - lastMousePositionRef.current.x;
      velocityRef.current.x = deltaX * 0.01;
      cameraRef.current.position.x -= velocityRef.current.x;
      lastMousePositionRef.current = { x: event.clientX, y: event.clientY };
    }
  }, [isDragging]);

  /**
 * @function handleCreated
 * @description Guarda la referencia a la cámara al ser creada.
 * @param {{ camera: THREE.Camera }} param0
 */
  const handleCreated = useCallback(({ camera }) => {
    cameraRef.current = camera;
  }, []);

  return {
    cameraRef,
    isDragging,
    velocityRef,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleCreated,
    CameraInertia
  };
}