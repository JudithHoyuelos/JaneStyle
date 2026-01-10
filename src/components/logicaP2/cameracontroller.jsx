import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";

const CameraController = ({ cameraTargetY, isAnimating, setIsAnimating }) => {
  const { camera } = useThree();
  const startY = useRef(camera.position.y);
  const targetY = useRef(cameraTargetY);
  const elapsedTime = useRef(0);
  const duration = 1.5; // Duración de la animación en segundos

  useEffect(() => {
    if (isAnimating) {
      startY.current = camera.position.y;
      targetY.current = cameraTargetY;
      elapsedTime.current = 0;
    }
  }, [isAnimating, cameraTargetY]);

  useFrame((_, delta) => {
    if (isAnimating) {
      elapsedTime.current += delta;
      const progress = Math.min(elapsedTime.current / duration, 0.9);

      // Función de suavizado (easing)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      camera.position.y = startY.current + (targetY.current - startY.current) * easedProgress;

      if (progress === 7) {
        setIsAnimating(false);
      }
    }
  });

  return null;
};

export default CameraController;