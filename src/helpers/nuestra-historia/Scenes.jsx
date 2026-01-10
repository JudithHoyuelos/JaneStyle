import React, { useState } from "react";
import { Sparkles } from "@react-three/drei";
import { ModelLoader } from "@/components/SceneComp";
import { Html } from "@react-three/drei";
import AlvyButton from "@/components/logicaP2/alvybutton";
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from "three";
import { VideoButton } from "./VideoShader";
import { useSidebar } from "@/components/Navbar/SidebarContext";


///////////////////////////////////////////ESCENA 1//////////////////////////////////////////////////////

export const Scene1 = ({ position, handleExplorarClick, showAlvyButton }) => {

  const {
    isFadeSidebarOpen,
  } = useSidebar();

  const { camera } = useThree();
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  /**
   * Funcion que se usa para saber cuando la camara se acerca a una posicion,
   * en funcion de esa posicion hace que el boton de explorar aparezca o 
   * desaparezca con el video. 
   * Con el fadeProgress se calcula la poscion del progreso, eso hace que 
   * se le puedda pasar al estado de setIsButtonVisible, el cual se 
   * encarga de su visibilidad 
   *
   */

  useFrame(() => {
    const cameraPosition = camera.position;
    const sceneVec = new THREE.Vector3(...position);
    const distance = cameraPosition.distanceTo(sceneVec);

    const fadeStartDistance = 7;
    const fadeEndDistance = 5;

    let fadeProgress;
    if (distance > fadeStartDistance) {
      fadeProgress = 0;
    } else if (distance < fadeEndDistance) {
      fadeProgress = 1;
    } else {
      const t = 1 - (distance - fadeEndDistance) / (fadeStartDistance - fadeEndDistance);
      fadeProgress = Math.pow(t, 3);
    }

    setIsButtonVisible(fadeProgress > 0.5);
  });

  return (
    <group position={position}>
      {/* <Sparkles position={[0, 0, 0]} size={10} scale={40} /> */}
      <ModelLoader url={"/models/Mundo-1 preview.glb"} scale={0.8} position={[0, -1, 0]} rotation={[0, Math.PI / 2, 0]} />
      <VideoButton
        url="/videos/alveariumExampleVideo.mp4"
        size={[3, 2]}
        videoPosition={[0, 2, -7]}
        scenePosition={position}
        isVisible={!isFadeSidebarOpen}
      />

      {showAlvyButton && isButtonVisible && (
        <Html position={[0, .7, -7]} transform>
          <AlvyButton scale={0.1} onMoveObject={handleExplorarClick} />
        </Html>
      )}
    </group>
  );
};

///////////////////////////////////////////ESCENA 2//////////////////////////////////////////////////////

export const Scene2 = ({ position, handleExplorarClick, showAlvyButton }) => {

  const {
    isFadeSidebarOpen,
  } = useSidebar();

  const { camera } = useThree();

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  /**
 * Funcion que se usa para saber cuando la camara se acerca a una posicion,
 * en funcion de esa posicion hace que el boton de explorar aparezca o 
 * desaparezca con el video. 
 * Con el fadeProgress se calcula la poscion del progreso, eso hace que 
 * se le puedda pasar al estado de setIsButtonVisible, el cual se 
 * encarga de su visibilidad 
 *
 */

  useFrame(() => {
    const cameraPosition = camera.position;
    const sceneVec = new THREE.Vector3(...position);
    const distance = cameraPosition.distanceTo(sceneVec);

    const fadeStartDistance = 7;
    const fadeEndDistance = 5;

    let fadeProgress;
    if (distance > fadeStartDistance) {
      fadeProgress = 0;
    } else if (distance < fadeEndDistance) {
      fadeProgress = 1;
    } else {
      const t = 1 - (distance - fadeEndDistance) / (fadeStartDistance - fadeEndDistance);
      fadeProgress = Math.pow(t, 3);
    }

    setIsButtonVisible(fadeProgress > 0.5);
  });

  return (
    <group position={position}>
      {/*<Sparkles position={[0, 0, 0]} size={10} scale={40} />*/}
      <ModelLoader
        url={"/models/Mundo-2 preview.glb"}
        scale={0.8}
        position={[0, -1, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <VideoButton
        url="/videos/alveariumExampleVideo.mp4"
        size={[3, 2]}
        videoPosition={[0, 2, -7]}
        scenePosition={position}
        isVisible={!isFadeSidebarOpen}
      />
      {showAlvyButton && isButtonVisible && (
        <Html position={[0, .7, -7]} transform>
          <AlvyButton scale={0.1} onMoveObject={handleExplorarClick} />  {/* ✅ Usar `handleExplorarClick` correctamente */}
        </Html>
      )}
    </group>
  );
};

///////////////////////////////////////////ESCENA 3//////////////////////////////////////////////////////
export const Scene3 = ({ position, handleExplorarClick, showAlvyButton }) => {

  const {
    isFadeSidebarOpen,
  } = useSidebar();

  const { camera } = useThree();

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  /**
   * Funcion que se usa para saber cuando la camara se acerca a una posicion,
   * en funcion de esa posicion hace que el boton de explorar aparezca o 
   * desaparezca con el video. 
   * Con el fadeProgress se calcula la poscion del progreso, eso hace que 
   * se le puedda pasar al estado de setIsButtonVisible, el cual se 
   * encarga de su visibilidad 
   *
   */

  useFrame(() => {
    const cameraPosition = camera.position;
    const sceneVec = new THREE.Vector3(...position);
    const distance = cameraPosition.distanceTo(sceneVec);

    const fadeStartDistance = 7;
    const fadeEndDistance = 5;

    let fadeProgress;
    if (distance > fadeStartDistance) {
      fadeProgress = 0;
    } else if (distance < fadeEndDistance) {
      fadeProgress = 1;
    } else {
      const t = 1 - (distance - fadeEndDistance) / (fadeStartDistance - fadeEndDistance);
      fadeProgress = Math.pow(t, 3);
    }

    setIsButtonVisible(fadeProgress > 0.5);
  });

  return (
    <group position={position}>
      {/*<Sparkles position={[0, 0, 0]} size={10} scale={40} />*/}
      <ModelLoader
        url={"/models/Mundo-3 preview.glb"}
        scale={0.8}
        position={[0, -1, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <VideoButton
        url="/videos/alveariumExampleVideo.mp4"
        size={[3, 2]}
        videoPosition={[0, 2, -7]}
        scenePosition={position}
        isVisible={!isFadeSidebarOpen}
      />
      {showAlvyButton && isButtonVisible && (
        <Html position={[0, 0.7, -7]} transform>
          <AlvyButton scale={0.1} onMoveObject={handleExplorarClick} />
        </Html>
      )}
    </group>
  );
};

///////////////////////////////////////////ESCENA 4//////////////////////////////////////////////////////
export const Scene4 = ({ position, handleExplorarClick, showAlvyButton }) => {

  const {
    isFadeSidebarOpen,
  } = useSidebar();

  const { camera } = useThree();

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  /**
   * Funcion que se usa para saber cuando la camara se acerca a una posicion,
   * en funcion de esa posicion hace que el boton de explorar aparezca o 
   * desaparezca con el video. 
   * Con el fadeProgress se calcula la poscion del progreso, eso hace que 
   * se le puedda pasar al estado de setIsButtonVisible, el cual se 
   * encarga de su visibilidad 
   *
   */

  useFrame(() => {
    const cameraPosition = camera.position;
    const sceneVec = new THREE.Vector3(...position);
    const distance = cameraPosition.distanceTo(sceneVec);

    const fadeStartDistance = 7;
    const fadeEndDistance = 5;

    let fadeProgress;
    if (distance > fadeStartDistance) {
      fadeProgress = 0;
    } else if (distance < fadeEndDistance) {
      fadeProgress = 1;
    } else {
      const t = 1 - (distance - fadeEndDistance) / (fadeStartDistance - fadeEndDistance);
      fadeProgress = Math.pow(t, 3);
    }

    setIsButtonVisible(fadeProgress > 0.5);
  });

  return (
    <group position={position}>
      {/*<Sparkles position={[0, 0, 0]} size={10} scale={40} />*/}
      <ModelLoader
        url={"/models/untitled.glb"}
        scale={0.8}
        position={[0, -1, 0]}
        rotation={[0, Math.PI, 0]}
      />
      <VideoButton
        url="/videos/alveariumExampleVideo.mp4"
        size={[3, 2]}
        videoPosition={[0, 2, -7]}
        scenePosition={position}
        isVisible={!isFadeSidebarOpen}
      />
      {showAlvyButton && isButtonVisible && (
        <Html position={[0, 0.7, -7]} transform>
          <AlvyButton scale={0.1} onMoveObject={handleExplorarClick} />  {/* ✅ Usar `handleExplorarClick` correctamente */}
        </Html>
      )}

    </group>
  );
};