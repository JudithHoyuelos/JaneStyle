import React, { useState, useEffect, useRef } from "react";
import { asset } from '@/utils/basePath';

const Sonido = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef(null); // Crear una referencia al elemento de audio

  const toggleSound = () => {
    setIsSoundOn((prevState) => !prevState); // Cambia el estado del sonido
  };

  useEffect(() => {
    if (isSoundOn) {
      console.log("Sonido activado");
      if (audioRef.current) {
        audioRef.current.play(); // Reproducir el audio
      }
    } else {
      console.log("Sonido desactivado");
      if (audioRef.current) {
        audioRef.current.pause(); // Pausar el audio
        audioRef.current.currentTime = 0; // Reiniciar el audio
      }
    }
  }, [isSoundOn]);

  return (
    <div id="bloque-sonido" onClick={toggleSound}>
      <div id="sonido">
        <p>Sound</p>
      </div>
      <div id="cuadro" className={isSoundOn ? "activo" : "inactivo"}>
        <div className="barra"></div>
        <div className="barra"></div>
        <div className="barra"></div>
        <div className="barra"></div>
      </div>
      {/* Elemento de audio oculto pero accesible */}
      <audio ref={audioRef} src={asset("audio/Natural speed.mp3")}></audio>
    </div>
  );
};

export default Sonido;