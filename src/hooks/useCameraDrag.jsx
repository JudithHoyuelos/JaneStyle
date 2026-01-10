import { CustomCanvas } from "@/components/SceneComp";
import { useCameraContext } from "@/contexts/CameraContext";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useCallback } from "react";
/**
 * @component CanvasNuestraHistoria
 * @description Componente que permite interacción de cámara con drag y scroll dentro del lienzo.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elementos hijos a renderizar en el canvas.
 * @returns {JSX.Element}
 */
export const CanvasNuestraHistoria = ({ children }) => {
  const {
    cameraRef,
    isDragging,
    setIsDragging,
    velocity,
    lastMousePos,
    scrollVelocity,
    setIsInMotion,
  } = useCameraContext();

  const handlePointerDown = useCallback((e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setIsInMotion(false);
  }, [setIsDragging, lastMousePos, setIsInMotion]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setIsInMotion(true);
  }, [setIsDragging, setIsInMotion]);

  const handlePointerMove = useCallback((e) => {
    if (isDragging && cameraRef.current) {
      const deltaY = lastMousePos.current.y - e.clientY;
      velocity.current.z = deltaY * -0.03;
      cameraRef.current.position.z += velocity.current.z;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  }, [isDragging, cameraRef, lastMousePos, velocity]);

  const handleWheel = useCallback((e) => {
    scrollVelocity.current = e.deltaY * -0.005;
    const deltaZ = e.deltaY * -0.01;
    cameraRef.current.position.z += deltaZ;
    setIsInMotion(false);
  }, [cameraRef, scrollVelocity, setIsInMotion]);

  return (
    <CustomCanvas
      shadows
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
    >
      {children}
    </CustomCanvas>
  );
};

/**
 * @component CameraInertia
 * @description Aplica inercia al movimiento de la cámara tras interacción del usuario.
 * @returns {null}
 */
export const CameraInertia = () => {
  const { cameraRef, scrollVelocity, velocity, isInMotion } = useCameraContext();

  useFrame(() => {
    if (cameraRef.current) {
      if (Math.abs(scrollVelocity.current) > 0.01) {
        cameraRef.current.position.z = Math.min(
          cameraRef.current.position.z + scrollVelocity.current,
          0
        );
        scrollVelocity.current *= 0.95;
      }

      if (isInMotion) {
        if (
          cameraRef.current.position.z < 0 &&
          Math.abs(velocity.current.z) >= 0.01
        ) {
          cameraRef.current.position.z += velocity.current.z;
          velocity.current.z *= 0.95;
        }
      }
    }
  });

  return null;
};

/**
 * @component CameraWobble
 * @description Aplica un ligero movimiento oscilante a la cámara basado en la posición del mouse.
 * @returns {null}
 */
export const GetCamera = () => {
  const { camera } = useThree();
  const { cameraRef } = useCameraContext();

  useEffect(() => {
    cameraRef.current = camera;
    console.log("Camera asignada al contexto:", cameraRef.current);
  }, [camera]);

  return null;
};

/**
 * @function lerp
 * @description Interpolación lineal entre dos valores.
 * @param {number} start
 * @param {number} end
 * @param {number} t - Factor de interpolación (0 a 1)
 * @returns {number}
 */
const lerp = (start, end, t) => {
  return start + (end - start) * t;
};

export const CameraWobble = () => {
  const { cameraRef, mousePos, setMousePos } = useCameraContext();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!cameraRef.current) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const normalizedMouseX = (mousePos.x / screenWidth) * 2 - 1;
    const normalizedMouseY = (mousePos.y / screenHeight) * 2 - 1;

    const targetX = normalizedMouseX * 0.2;
    const targetY = 2 + (-normalizedMouseY * 0.2);

    const smoothFactor = 0.9;
    cameraRef.current.position.x = lerp(cameraRef.current.position.x, targetX, smoothFactor);
    cameraRef.current.position.y = lerp(cameraRef.current.position.y, targetY, smoothFactor);
  });

  return null;
};
