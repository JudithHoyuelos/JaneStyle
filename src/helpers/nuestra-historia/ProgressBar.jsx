// ProgressBar.js
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useCameraContext } from "@/contexts/CameraContext";

/**
 * Funcion que se utiliza para poder calcular el progreso en la paguina.
 * El cual se va mostrando en una barra, la cual se va volviendo mas gorda si 
 * avanzas y mas fina si vas hacia atras. Para eso se usa la posicion en la camara,
 * ya que se necesita saber cuanto se va moviendo.
 *
 * @returns {HTML} - Devuelve la maya con el html de la barra
 */
export const ProgressBar = () => {
  const meshRef = useRef();
  const [progress, setProgress] = useState(0);
  const segmentLength = 160;
  const { cameraRef } = useCameraContext();

  useFrame(() => {
    if (cameraRef.current) {
      const cyclePosition =
        Math.abs(cameraRef.current.position.z) % segmentLength;
      const cycleProgress = (cyclePosition / segmentLength) * 100;
      setProgress(cycleProgress);

      if (meshRef.current) {
        meshRef.current.position.set(0, -120, cameraRef.current.position.z - 200);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <Html center>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </Html>
    </mesh>
  );
};