"use client";
import React, { useRef, useEffect, useState } from "react";
import { CustomCanvas } from "../components/SceneComp";
import SidebarLanding from "@/components/logicaP2/sidebarhor.jsx";
import CameraController from "@/components/logicaP2/cameracontroller.jsx";
import Sonido from "@/components/sonido/Sonido.jsx";
import CustomButtons from "@/components/common/Buttons/CustomButtons.jsx";
import { PortalesContent } from "@/helpers/landing/PortalesContent";
import { usePortalHandlers } from "@/helpers/landing/usePortalHandlers";
import MenuLanding from "@/components/text/MenuLanding";
import NavBarLanding from "@/components/NavbarLanding/NavbarLanding";
import { useSidebarLanding } from "@/components/NavbarLanding/SidebarContextLandig";
import FooterLinks from "@/components/landing/FooterLinks";
import withProgressLoader from "@/components/common/Loader/withProgressLoader";
import Chatbot from "@/components/alvy/Chatbot";

function Portales() {
  const cameraRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [angle, setAngle] = useState(0);
  const [buttonLocked, setButtonLocked] = useState(false);
  const [targetAngle, setTargetAngle] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [currentPortal, setCurrentPortal] = useState(0);
  const velocityRef = useRef(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const handlers = usePortalHandlers({
    isDragging,
    setIsDragging,
    angle,
    setAngle,
    setTargetAngle,
    setMouseX,
    setMouseY,
    setCurrentPortal,
    velocityRef,
  });

  const {
    isSidebarCOpen,
    isSidebarhmOpen,
    closeAllSidebars,
    cameraTargetY,
    isAnimating,
    setCameraTargetY,
    setIsAnimating,
  } = useSidebarLanding();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLeftClick = () => {
    if (buttonLocked) return;
    setButtonLocked(true);
    handlers.handlePrevPortal();
    setTimeout(() => setButtonLocked(false), 400);
  };

  const handleRightClick = () => {
    if (buttonLocked) return;
    setButtonLocked(true);
    handlers.handleNextPortal();
    setTimeout(() => setButtonLocked(false), 400);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <CustomCanvas
          camera={{ position: [0, 2, 2.9], fov: 50, rotation: [0, 0, 0] }}
          style={{ width: "100vw", height: "100vh" }}
          shadows
          onPointerDown={handlers.handlePointerDown}
          onPointerUp={handlers.handlePointerUp}
          onPointerMove={handlers.handlePointerMove}
          onTouchStart={handlers.handleTouchStart}
          onTouchEnd={handlers.handleTouchEnd}
          onCreated={({ camera }) => (cameraRef.current = camera)}
        >
          <PortalesContent
            isDragging={isDragging}
            angle={angle}
            setAngle={setAngle}
            targetAngle={targetAngle}
            mouseX={mouseX}
            mouseY={mouseY}
            currentPortal={currentPortal}
            windowSize={windowSize}
            cameraTargetY={cameraTargetY}
            isAnimating={isAnimating}
          />
          <CameraController
            cameraTargetY={cameraTargetY}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        </CustomCanvas>
        <CustomButtons
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          isMenuOpen={isSidebarhmOpen || isSidebarCOpen}
        />

        <div>
          <FooterLinks isSidebarhmOpen={isSidebarhmOpen} />
        </div>

        <NavBarLanding isSidebarhmOpen={isSidebarhmOpen} />
        <SidebarLanding
          isOpen={isSidebarhmOpen}
          className="sidebarhm"
          onClose={closeAllSidebars}
        >
          <MenuLanding />
        </SidebarLanding>
      </div>
      <Sonido isMenuOpen={isSidebarhmOpen || isSidebarCOpen} />
      <Chatbot/>
    </>
  );
}

export default withProgressLoader(Portales);