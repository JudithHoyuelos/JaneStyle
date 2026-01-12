"use client";

import React, { useState } from "react";
import { Environment } from "@react-three/drei";
import "./nuestra-historia.css";
import SidebarLanding from "@/components/logicaP2/sidebarhor.jsx";
import { useSidebar } from "@/components/Navbar/SidebarContext";
import Navbar from "@/components/Navbar/Navbar";
import Sonido from "@/components/sonido/Sonido.jsx";
import MenuHistoria from "@/components/text/MenuHistoria";
import ContenidoHistoria from "@/components/text/ContenidoHistoria";
import { RecursiveScenes } from "@/helpers/nuestra-historia/RecursiveScenes";
import { ProgressBar } from "@/helpers/nuestra-historia/ProgressBar";
import { ColorChanging } from "@/helpers/nuestra-historia/ColorChanging";
import { TextoExterno } from "@/helpers/nuestra-historia/TextoExterno";
import { useContenido } from "@/hooks/nuestra-historia/useContenido";
import { useHistoriaHandlers } from "@/hooks/nuestra-historia/useHistoriaHandlers";
import withProgressLoader from "@/components/common/Loader/withProgressLoader";
import FadeSidebar from "@/components/logicaP2/sidabarht";
import NewHamburgerButton from "@/components/logicaP2/buttonhamburgesht";
import { CameraProvider } from "@/contexts/CameraContext";
import RecursiveSparkle from "@/helpers/nuestra-historia/RecursiveSparkle";
import { AnimatedText, CameraPositionWatcher } from "@/helpers/nuestra-historia/AnimatedText";
import {
  CameraInertia,
  CameraWobble,
  GetCamera,
  useCameraDrag,
  handleWheel,
  Canvas1,
  CanvasNuestraHistoria,
} from "@/hooks/useCameraDrag";
// import { EffectComposer, Bloom, Selection, Select } from "@react-three/postprocessing";


function P3Historia() {
  const [isSidebarhOpen, setIsSidebarhOpen] = useState(false);
  // const [isFadeSidebarOpen, setIsFadeSidebarOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false); // Estado para mostrar el botón de hamburguesa
  const [showAlvyButton, setShowAlvyButton] = useState(true); // Estado para controlar la visibilidad de AlvyButton
  const [showReturnButton, setShowReturnButton] = useState(true); // Nuevo estado para controlar ReturnButton
  const [text, setText] = useState({
    title: "",
    content: "",
    visible: false,
    opacity: 0,
  });
  const [progressValue, setProgressValue] = useState(0); // 🔹 Estado para controlar `ProgressBar`
  const [showAnimatedText, setShowAnimatedText] = useState(true);
  const [disableScroll, setDisableScroll] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState(null);

  const {
    isSidebarOpen,
    isFadeSidebarOpen,
    setIsFadeSidebarOpen,
  } = useSidebar();

  const visibilitySidebarMenuLanding = () => {
    setIsSidebarhOpen(!isSidebarhOpen);
  };

  const visibilitySidebarContend = () => {
    setIsSidebarhOpen(false);
  };

  const { contenido, cerrarTexto } = useContenido();

  const [currentScene, setCurrentScene] = useState("escena1");

  const {
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    toggleFadeSidebar,
    handleExplorarClick,
    handlePositionChange
  } = useHistoriaHandlers({
    setShowHamburger,
    setShowAlvyButton,
    setShowReturnButton,
    setShowAnimatedText,
    setDisableScroll,
    setIsFadeSidebarOpen,
    isFadeSidebarOpen,
    setText,
    setCurrentScene,
  });

  return (
    <>
      <CameraProvider>
        <CanvasNuestraHistoria>

          {/* <EffectComposer>
            <Bloom intensity={0.1} luminanceThreshold={1} luminanceSmoothing={1} />
          </EffectComposer> */}
          <fog attach="fog" args={['#ff6347', 10, 20]} />
          <ColorChanging />
          <RecursiveScenes
            showAlvyButton={showAlvyButton}
            handleExplorarClick={handleExplorarClick}
          />

          <RecursiveSparkle />

          <ProgressBar progressValue={progressValue} />
          <CameraPositionWatcher onPositionChange={handlePositionChange} />
          <Environment
            background={false}
            preset="sunset"
            environmentIntensity={0.3}
          />
          <CameraInertia />
          <CameraWobble />
          <GetCamera />
        </CanvasNuestraHistoria>
      </CameraProvider>

      <TextoExterno
        visible={!!contenido}
        renderContenido={contenido}
        onClose={cerrarTexto}
      />

      {showAnimatedText && (
        <AnimatedText
          title={text.title}
          content={text.content}
          visible={text.visible}
          opacity={text.opacity}
        />
      )}

      <SidebarLanding isOpen={isSidebarOpen} className="sidebarhm" onClose={visibilitySidebarMenuLanding}>
        <MenuHistoria></MenuHistoria>
      </SidebarLanding>

      <FadeSidebar
        isOpen={isFadeSidebarOpen}
        onClose={toggleFadeSidebar}
        selectedCircle={selectedCircle}
        onReset={() => setSelectedCircle(null)}
      >
        {currentScene === "escena1" && (
          <ContenidoHistoria setSelectedCircle={setSelectedCircle} sidebarId={1} />
        )}
        {currentScene === "escena2" && (
          <ContenidoHistoria setSelectedCircle={setSelectedCircle} sidebarId={2} />
        )}
        {currentScene === "escena3" && (
          <ContenidoHistoria setSelectedCircle={setSelectedCircle} sidebarId={3} />
        )}
        {currentScene === "escena4" && (
          <ContenidoHistoria setSelectedCircle={setSelectedCircle} sidebarId={4} />
        )}
      </FadeSidebar>

      <Navbar title={""} showReturnButton={!isFadeSidebarOpen} />

      {/* Botón de hamburguesa que controla el nuevo sidebar (aparece tras hacer clic en Explorar) */}
      {showHamburger && (
        <NewHamburgerButton
          onClick={() => {
            if (selectedCircle) {
              setSelectedCircle(null); // ⬅️ Esto es tu onReset
            }
            toggleFadeSidebar(); // ⬅️ Esto es tu onClose
          }}
        />
      )}
      <Sonido />
    </>
  );
}

export default withProgressLoader(P3Historia);
