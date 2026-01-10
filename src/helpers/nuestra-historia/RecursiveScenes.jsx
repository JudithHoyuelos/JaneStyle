import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Scene1, Scene2, Scene3, Scene4 } from "./Scenes";
import { useCameraContext } from "@/contexts/CameraContext";

/**
 * Es la funcion que se encarga de ir alternando entre una escena y otra
 * en la paguina de nuestra historia. Se le pasan las cuatro escenas y 
 * estas se cargan para despues mostrarlas.
 * Calcula el desplazamiento para ver que escena mostrar. 
 *
 * @export
 * @param {{ showAlvyButton: any; handleExplorarClick: any; }} param0
 * @param {boolean} [showAlvyButton] - El estado del boton de explorar
 * @param {Function} [handleExplorarClick] - Funcion para cuando se clica
 * @returns {Object} - Devuelve un componente donde se cargan todas las escenas
 */
export function RecursiveScenes({ showAlvyButton, handleExplorarClick }) {
  const initialPositions = [-20, -60, -100, -140];
  const displacement = 160;

  const [positions, setPositions] = useState(initialPositions);

  const { cameraRef } = useCameraContext();

  /**
   * Se calcula el desplaciamiento entre las escenas, tanto si vas hacia delante 
   * como si vas hacia atras
   *
   * @param {number} [currentPositions] - Es la posicion donde esta la camara
   * @returns {number} - La posicion
   */
  const calculateNewPositions = (currentPositions) => {
    return currentPositions.map((pos) => {
      const lowerLimit = pos - displacement + 40;
      const upperLimit = pos + displacement - 40;

      if (cameraRef.current.position.z < lowerLimit) {
        return pos - displacement;
      } else if (cameraRef.current.position.z > upperLimit) {
        return pos + displacement;
      }

      return pos;
    });
  };

  useFrame(() => {
    if (cameraRef.current) {
      const newPositions = calculateNewPositions(positions);
      if (!positions.every((pos, index) => pos === newPositions[index])) {
        setPositions(newPositions);
    }
  }
  });

  return (
    <>
      {positions.map((position, index) => {
        const SceneComponent = [Scene1, Scene2, Scene3, Scene4][index];
        return (
          <SceneComponent
            key={index}
            position={[0, 0, position]}
            showAlvyButton={showAlvyButton}
            handleExplorarClick={handleExplorarClick}
          />
        );
      })}
    </>
  );
}