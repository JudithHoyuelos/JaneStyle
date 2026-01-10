"use client"

import React, { useState } from "react";
import { CustomCanvas, ModelLoader, OceanComponent, SkyComponent } from "@/components/SceneComp";
import * as THREE from "three";
import SidebarConted from "@/components/logicaP2/sidebarc.jsx"
import Sidebar from "@/components/logicaP2/sidebar.jsx"
import { useSidebar } from "@/components/Navbar/SidebarContext";
import Sonido from "@/components/sonido/Sonido";
import Terminos from "@/components/text/Terminos";
import Preguntas from "@/components/text/Preguntas";
import ChatbotInfo from "@/components/text/ChatbotInfo";
import Chatbot from "@/components/alvy/Chatbot";
import Contacto from "@/components/text/Contacto";
import MenuInfo from "@/components/text/MenuInfo";
import ModelWithHtml from "@/components/modeloHtml/ModelWithHtml";
import Navbar from "@/components/Navbar/Navbar";
import { CameraController } from "@/helpers/informacion/CameraController";
import { InteractiveMesh } from "@/helpers/informacion/InteractiveMesh";
import Model from "@/helpers/informacion/Model";
import { useCanvasHandlers } from "@/hooks/informacion/useCanvasHandlers";
import withProgressLoader from "@/components/common/Loader/withProgressLoader";


function P2CanvasComponent() {
  const xLimit = 5;
  const zDepth = -2;
  const [modelPosition, setModelPosition] = useState(new THREE.Vector3(-3, 1, 4));

  const {
    isSidebarOpen,
    isSidebarCOpen,
    visibilitySidebarMenu,
    closeAllSidebars,
    handleOpenContactSidebar,
    handleOpenChatSidebar,
    handleOpenPregSidebar,
    handleOpenTermiSidebar,
    targetPosition,
    setTargetPosition,
    targetRotation,
    setTargetRotation,
    enableControls,
    setEnableControls,
    previousPosition,
    setPreviousPosition,
    previousRotation,
    setPreviousRotation,
    cameraX,
    setCameraX,
    currentCameraPosition,
    currentCameraRotation,
    isWobbleActive,
    setIsWobbleActive,
  } = useSidebar();

  const {
    handleCameraUpdate,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging
  } = useCanvasHandlers({
    cameraX,
    setCameraX,
    xLimit,
    enableControls,
  });

  const handleCubeClick = (position, rotation) => {
    if (targetPosition && targetPosition.equals(position)) {
      // Si el objetivo ya está alcanzado, regresa a la posición inicial
      setTargetPosition(previousPosition || new THREE.Vector3(0, 1.6, 10));
      setTargetRotation(previousRotation || new THREE.Euler(0, 0, 0));
      setTimeout(() => {
        setTargetPosition(null);
        setTargetRotation(null);
        setEnableControls(true); // Reactiva el control dinámico
      }, 3000);
    } else {
      // Guarda la posición actual antes de cambiar
      setPreviousPosition(new THREE.Vector3().copy(currentCameraPosition.current));
      setPreviousRotation(new THREE.Euler().copy(currentCameraRotation.current));
      setIsWobbleActive(false); // Pausar el wobble

      setTargetPosition(position);
      setTargetRotation(rotation);
      setEnableControls(false); // Desactiva el control dinámico temporalmente

      // Vuelve a activar el control dinámico después de enfocar
      setTimeout(() => {
        setEnableControls(true);
      }, 3000); // Ajusta según la duración de la animación
    }
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} className="sidebar" onClose={visibilitySidebarMenu}>
        <MenuInfo></MenuInfo>
      </Sidebar>

      <CustomCanvas
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart} // Añade para eventos táctiles
        onTouchMove={handleTouchMove}   // Añade para movimientos táctiles
        onTouchEnd={handleTouchEnd}     // Añade para finalizar toques
      >
        <ambientLight intensity={1} />
        <SkyComponent />
        <OceanComponent />
        {<ModelLoader position={[0, 0.1, 5]} rotation={[0, 240 * (Math.PI / 180), 0]} url={"/models/Geo_AlveaOriginal_03.glb"} />}

        <CameraController
          targetPosition={targetPosition}
          targetRotation={targetRotation}
          cameraX={cameraX}
          xLimit={xLimit}
          zDepth={zDepth}
          enableControls={enableControls}
          onCameraUpdate={handleCameraUpdate}
          isDragging={isDragging} // Pasa la referencia aquí
          isWobbleActive={isWobbleActive} // Pasar el estado al controlador
        />
        {/* Modelo 1: Contacto */}
        {/* Círculo del cuenco */}
        <ModelWithHtml
          position={[4.4, 0.65, 3.3]} // Posición del modelo en el espacio 3D
          hoverMessage="Contacto" // Mensaje personalizado para el hover
          cameraPosition={new THREE.Vector3(11.0, 2, -1)} // Posición a la que la cámara debe moverse
          cameraRotation={new THREE.Euler(0, Math.PI / 1, 0)} // Rotación deseada de la cámara
          onClick={() => {
            handleOpenContactSidebar(); // Abre el sidebar correspondiente
            handleCubeClick(
              new THREE.Vector3(4.5, 1.65, 5.3), // Posición del modelo
              new THREE.Euler(0, Math.PI / 0.005, 0), // Rotación deseada
              new THREE.Vector3(0, 0, 1) // Offset para posicionar la cámara detrás del modelo
            );
          }}
        />

        {/* Modelo 2: Chat Bot */}
        {/* Círculo de la figura geometrica */}
        <ModelWithHtml
          position={[3.5, 0.5, 1.4]}
          hoverMessage="Alvy AI"
          cameraPosition={new THREE.Vector3(7.6, 1, -4)}
          cameraRotation={new THREE.Euler(0, Math.PI / 1.5, 0)}
          onClick={() => {
            handleOpenChatSidebar();
            handleCubeClick(new THREE.Vector3(3.7, 1, 3.4));
          }}
        />

        {/* Círculo de la planta */}
        {/* Modelo 3: Preguntas Frecuentes */}
        <ModelWithHtml
          position={[1.8, -0.1, 1.5]}
          hoverMessage="Preguntas Frecuentes"
          cameraPosition={new THREE.Vector3(4.8, 1, -7)}
          cameraRotation={new THREE.Euler(0, Math.PI / 2, 0)}
          onClick={() => {
            handleOpenPregSidebar();
            handleCubeClick(new THREE.Vector3(2.3, 1, 3.5));
          }}
        />

        {/* Círculo de la planta */}
        {/* Modelo 4: Términos y Condiciones */}
        <ModelWithHtml
          position={[-0.7, -0.3, 1]}
          hoverMessage="Términos y Condiciones"
          cameraPosition={new THREE.Vector3(0, 1.6, 8)}
          cameraRotation={new THREE.Euler(0, Math.PI / 3, 0)}
          onClick={() => {
            handleOpenTermiSidebar();
            handleCubeClick(new THREE.Vector3(-0.6, 1, 3));
          }}
        />
      </CustomCanvas>

      {/* <Hotspot onClick={handleOpenContactSidebar} ></Hotspot> */}
      <SidebarConted isOpen={isSidebarCOpen === "contacto"} onClose={closeAllSidebars}>
        <Contacto></Contacto>
      </SidebarConted>

      <SidebarConted isOpen={isSidebarCOpen === "chatbot"} onClose={closeAllSidebars}>
        <ChatbotInfo></ChatbotInfo>
      </SidebarConted>

      <SidebarConted isOpen={isSidebarCOpen === "faq"} onClose={closeAllSidebars}>
        <Preguntas></Preguntas>
      </SidebarConted>

      <SidebarConted isOpen={isSidebarCOpen === "terminos"} onClose={closeAllSidebars}>
        <Terminos></Terminos>
      </SidebarConted>

      <Sonido />
      <Navbar title={"Informacion"}></Navbar>
      <Chatbot />
    </>
  );
}

export default withProgressLoader(P2CanvasComponent);