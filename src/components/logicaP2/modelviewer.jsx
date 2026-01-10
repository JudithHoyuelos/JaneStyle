import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { SkyComponent } from "../SceneComp";

/**
 * Funcion para cargar el modelo desde la url que se le pasa.
 * Devulve una maya con el modelo y la rotacion de este. 
 *
 * @param {{ url: any; }} param0
 * @param {string} [param0.url] - La ruta del modelo
 * @returns {mesh} - El modelo ya cargado
 */

const ModelViewer = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <mesh rotation={[0,-Math.PI/2,0]}>
      <primitive object={gltf.scene} scale={1}  />
    </mesh>
  );
};

/**
 * Funcion para crear una escena donde se pueda cargar el modelo que se quiera ver.
 * Recibe por parametros la url del modelo
 *
 * @param {{ modelUrl: any; }} param0
 * @param {string} [param0.modelUrl] - La ruta del modelo que se quiere cargar
 * @returns {Object} - La escena montada con el modelo cargado
 */

const Viewer = ({ modelUrl }) => {
  return (
    <Canvas>
      {/* Luz */}
      <Environment background={false} files="/img/equirectangular/sky-background-4.hdr"></Environment>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={<Html>Loading...</Html>}>
        {/* Modelo 3D */}
        <ModelViewer url={modelUrl} />
      </Suspense>
      {/* Controles para rotar */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

/**
 * Exporta el componente dentro de un div para ver la tarjeta de contacto 3D
 *
 * @export
 * @returns {Object} - Modelo 3D de la tarjeta de contacto
 */
export default function App() {
  return (
    <div style={{ width: "70%", height: "70vh" }}>
      <Viewer modelUrl="/models/Alvearium-TarjetaVirtual(1).glb" />
    </div>
  );
}
