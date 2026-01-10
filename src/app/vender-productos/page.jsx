"use client";

import React, { useState } from "react";
import {
  CustomCanvas,
  ModelLoader,
  OceanComponent,
  SkyComponent,
} from "@/components/SceneComp";
import { useCameraControls } from "@/hooks/useCameraControls";
import { Html } from "@react-three/drei";
import Sonido from "@/components/sonido/Sonido.jsx";
import InicioLogo from "@/components/logo/logo";
import ReturnButton from "@/components/logicaP2/returnbutton";
import withProgressLoader from "@/components/common/Loader/withProgressLoader";
import SidebarLanding from "@/components/logicaP2/sidebarhor.jsx";
import { useSidebar } from "@/components/Navbar/SidebarContext";
import NavBarGeneral from "@/components/NavbarGeneral/NavbarGeneral";
import MenuHistoria from "@/components/text/MenuHistoria";

const getContentForModel1 = () => (
  <div
    style={{ background: "lightblue", padding: "20px", borderRadius: "8px" }}
  >
    <h2>Contenido para el Modelo 1</h2>
    <p>
      Este es el contenido específico para el modelo 1. Puedes poner cualquier
      HTML y estilos aquí.
    </p>
  </div>
);

const getContentForModel2 = () => (
  <div
    style={{ background: "lightgreen", padding: "20px", borderRadius: "8px" }}
  >
    <h2>Contenido para el Modelo 2</h2>
    <p>
      Este es el contenido específico para el modelo 2. Puede ser cualquier cosa
      que quieras mostrar.
    </p>
  </div>
);

const getContentForModel3 = () => (
  <div
    style={{ background: "lightcoral", padding: "20px", borderRadius: "8px" }}
  >
    <h2>Contenido para el Modelo 3</h2>
    <p>
      Este es el contenido específico para el modelo 3. Aquí también puedes
      colocar el HTML que prefieras.
    </p>
  </div>
);

const contentFunctions = {
  1: getContentForModel1,
  2: getContentForModel2,
  3: getContentForModel3,
};

const ModelWithHtml = ({
  position,
  scale,
  rotation,
  modelUrl,
  modelNumber,
  setContent,
  setShowContent,
}) => {
  const handleClick = () => {
    const contentFunction = contentFunctions[modelNumber];
    if (contentFunction) {
      setContent(contentFunction());
      setShowContent(true);
    }
  };

  return (
    <group position={position}>
      <ModelLoader scale={scale} rotation={rotation} url={modelUrl} />
      <Html center position={[0, 1, 0]}>
        <div onClick={handleClick} className="clickable-circle-container">
          <div className="outer-circle"></div>
          <div className="middle-circle"></div>
          <div className="inner-circle"></div>
        </div>
      </Html>
    </group>
  );
};

function P5Productos() {
  const [content2D, setContent2D] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const {
    cameraRef,
    isDragging,
    velocityRef,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleCreated,
    CameraInertia,
  } = useCameraControls();

  const closeContent = () => setShowContent(false);

  const {
    isSidebarOpen,
    visibilitySidebarMenu,
  } = useSidebar();

  return (
    <>
      <CustomCanvas
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onCreated={handleCreated}
      >
        <CameraInertia
          cameraRef={cameraRef}
          velocityRef={velocityRef}
          isDragging={isDragging}
        />
        <SkyComponent />
        <OceanComponent />
        <ambientLight intensity={1} />
        <ModelWithHtml
          position={[-2, 1, -7]}
          scale={[10, 10, 10]}
          rotation={[0, 0, 0]}
          modelUrl="/models/logoAlvearium.gltf"
          modelNumber={1}
          setContent={setContent2D}
          setShowContent={setShowContent}
        />
        <ModelWithHtml
          position={[0, 1, -7]}
          scale={[1, 1, 1]}
          rotation={[0, Math.PI / 4, 0]}
          modelUrl="/models/logoAlvearium.gltf"
          modelNumber={2}
          setContent={setContent2D}
          setShowContent={setShowContent}
        />
        <ModelWithHtml
          position={[2, 1, -7]}
          scale={[1, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
          modelUrl="/models/logoAlvearium.gltf"
          modelNumber={3}
          setContent={setContent2D}
          setShowContent={setShowContent}
        />
      </CustomCanvas>

      {showContent && content2D && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            zIndex: 10,
            maxWidth: "300px",
          }}
        >
          <button
            onClick={closeContent}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            X
          </button>
          <div>{content2D}</div>
        </div>
      )}
      <SidebarLanding isOpen={isSidebarOpen} className="sidebarhm" onClose={visibilitySidebarMenu}>
        <MenuHistoria></MenuHistoria>
      </SidebarLanding>
      <Sonido />
      <NavBarGeneral />
    </>
  );
}

export default withProgressLoader(P5Productos);