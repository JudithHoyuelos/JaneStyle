import { useCallback } from "react";
import { portals } from "@/constants/portal";

/**
 * Custom hook para gestionar los eventos relacionados con la rotación de portales
 * en una escena 3D. Controla el arrastre del ratón/touch, la rotación y el cambio
 * de portal visible.
 *
 * @param {Object} params - Parámetros del hook.
 * @param {boolean} params.isDragging - Estado actual de arrastre.
 * @param {Function} params.setIsDragging - Setter para el estado de arrastre.
 * @param {number} params.angle - Ángulo actual de rotación de la escena.
 * @param {Function} params.setAngle - Setter del ángulo actual.
 * @param {Function} params.setTargetAngle - Setter del ángulo objetivo (snap).
 * @param {Function} params.setMouseX - Setter de la posición X del mouse.
 * @param {Function} params.setMouseY - Setter de la posición Y del mouse.
 * @param {Function} params.setCurrentPortal - Setter del índice actual del portal.
 * @param {React.MutableRefObject<number>} params.velocityRef - Referencia al valor de velocidad de rotación.
 *
 * @returns {Object} Manejadores para eventos de puntero y control de portales.
 */
export const usePortalHandlers = ({
  isDragging,
  setIsDragging,
  angle,
  setAngle,
  setTargetAngle,
  setMouseX,
  setMouseY,
  setCurrentPortal,
  velocityRef,
}) => {
  /**
   * Calcula el ángulo más cercano al ángulo actual para hacer "snap"
   * al portal más cercano y actualiza el portal actual.
   */
  const snapToNearestPortal = useCallback(() => {
    const snapAngle = (Math.PI * 2) / portals.length;
    const nearestPortal = Math.round(angle / snapAngle);
    const newTargetAngle = nearestPortal * snapAngle;
    setTargetAngle(newTargetAngle);
    setCurrentPortal(nearestPortal % portals.length);
  }, [angle, setTargetAngle, setCurrentPortal]);

  /**
   * Inicia el arrastre cuando se presiona el botón del mouse.
   */
  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
    velocityRef.current = 0;
  }, [setIsDragging, velocityRef]);

  /**
   * Finaliza el arrastre cuando se suelta el botón del mouse y ajusta al portal más cercano.
   */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    snapToNearestPortal();
  }, [setIsDragging, snapToNearestPortal]);

  /**
   * Mueve la escena horizontalmente durante el arrastre del mouse.
   *
   * @param {MouseEvent} event - Evento del puntero.
   */
  const handlePointerMove = useCallback(
    (event) => {
      if (isDragging) {
        const deltaX = event.movementX;
        const rotationSpeed = 0.0009;
        const movementThreshold = 7;

        if (Math.abs(deltaX) > movementThreshold) {
          velocityRef.current = deltaX * rotationSpeed;
          const newAngle = angle + velocityRef.current;
          setAngle(newAngle);
          setTargetAngle(newAngle);
        }
      }
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    },
    [isDragging, angle, setAngle, setTargetAngle, setMouseX, setMouseY, velocityRef]
  );

  /**
   * Inicia el arrastre táctil.
   */
  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
    velocityRef.current = 0;
  }, [setIsDragging, velocityRef]);

  /**
   * Finaliza el arrastre táctil y ajusta al portal más cercano.
   */
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    snapToNearestPortal();
  }, [setIsDragging, snapToNearestPortal]);

  /**
   * Avanza al siguiente portal rotando la escena en sentido antihorario.
   */
  const handleNextPortal = useCallback(() => {
    const snapAngle = (Math.PI * 2) / portals.length;
    const newTargetAngle = angle - snapAngle;
    setTargetAngle(newTargetAngle);
    setCurrentPortal((prevPortal) => (prevPortal - 1 + portals.length) % portals.length);
  }, [angle, setTargetAngle, setCurrentPortal]);

  /**
   * Retrocede al portal anterior rotando la escena en sentido horario.
   */
  const handlePrevPortal = useCallback(() => {
    const snapAngle = (Math.PI * 2) / portals.length;
    const newTargetAngle = angle + snapAngle;
    setTargetAngle(newTargetAngle);
    setCurrentPortal((prevPortal) => (prevPortal + 1) % portals.length);
  }, [angle, setTargetAngle, setCurrentPortal]);

  return {
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleTouchStart,
    handleTouchEnd,
    handleNextPortal,
    handlePrevPortal,
  };
};
