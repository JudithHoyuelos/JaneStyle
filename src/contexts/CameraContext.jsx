import { createContext, useContext, useRef, useState } from "react";

const CameraContext = createContext(null);

export const CameraProvider = ({ children }) => {
  const cameraRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const scrollVelocity = useRef(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInMotion, setIsInMotion] = useState(false);

  return (
    <CameraContext.Provider
      value={{
        cameraRef,
        isDragging,
        setIsDragging,
        isInMotion,
        setIsInMotion,
        velocity,
        lastMousePos,
        scrollVelocity,
        mousePos,
        setMousePos,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCameraContext must be used within a CameraProvider");
  }
  return context;
};