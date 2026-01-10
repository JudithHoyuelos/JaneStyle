import { useCameraContext } from "@/contexts/CameraContext";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Vector3 } from "three";

/**
 * Funcion que se utiliza para cambiar el color de las luces. 
 * Esto se hace teniendo en cuenta la posicion de la camara, para saber
 * en que escenas esats y poder cambiar las luces y los colores a medida
 * que se va avanzando por la paguina.
 *
 * @export
 * @returns {object} - Devulve las luces con los colores deseados
 */
export function ColorChanging() {
  const { scene } = useThree();
  const { cameraRef } = useCameraContext();

  //const colors = useRef(["#3e1a47", "#7a4e9f", "#b286d1", "#f0aad4"]);
  // const colors = useRef(["#6a1b9a", "#8e44ad", "#b39ddb", "#d1c4e9"]);
  //  const colors = useRef(["#8B2E5E", "#C86496", "#E29BC1", "#F5CCE1"]);
  // const colors = useRef(["lightgreen", "pink", "lightblue", "lightyellow"]);
  const colors = useRef(["#C1A3E9",  "lightblue", "lightgreen", "pink"]);
  const targetColor = useRef(new Color(colors.current[0]));
  const currentColor = useRef(new Color(colors.current[0]));
  const transitionSpeed = 0.02;
  const ambientLightRef = useRef();
  const spotLightRef = useRef();

  const targetPosition = new Vector3(0, -1, 0);

  useFrame(() => {
    if (cameraRef.current) {
      const initialZ = 5;
      const colorChangeInterval = 40;
      const colorIndex =
        Math.floor(
          -(cameraRef.current.position.z - initialZ) / colorChangeInterval
        ) % colors.current.length;

      const nextColor = colors.current[colorIndex];
      if (!targetColor.current.equals(new Color(nextColor))) {
        targetColor.current.set(nextColor);
      }

      currentColor.current.lerp(targetColor.current, transitionSpeed);

      scene.background = currentColor.current;
      scene.fog.color.set(currentColor.current);

      if (ambientLightRef.current) {
        ambientLightRef.current.color.set(currentColor.current);
      }

      if (spotLightRef.current) {
        spotLightRef.current.position.set(
          cameraRef.current.position.x,
          cameraRef.current.position.y + 2,
          cameraRef.current.position.z - 6
        );

        spotLightRef.current.target.position.set(
          cameraRef.current.position.x,
          cameraRef.current.position.y,
          cameraRef.current.position.z - 6
        );
        spotLightRef.current.target.updateMatrixWorld();

        spotLightRef.current.color.set(currentColor.current);
      }
    }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={1} />
      <spotLight
        ref={spotLightRef}
        intensity={20}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.001}
        decay={2}
        distance={50}
        angle={Math.PI / 2.5}
        penumbra={0.3}
      />
    </>
  );
}