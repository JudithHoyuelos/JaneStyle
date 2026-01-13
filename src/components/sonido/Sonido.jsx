import React, { useState, useEffect, useRef } from "react";
import './Sonido.css';
import { asset } from '@/utils/basePath';

/**
 * Es el boton que activa o desactiva el sonido en todas las paguinas.
 * En la landing si esta abierto el menu este baja hacia abajo. 
 *
 * @param {{ isMenuOpen: any; }} param0
 * @param {boolean} [isMenuOpen] - Controla en la landing si el menu esta abierto
 * @returns {div} - Boton del sonido
 */

const Sonido = ({ isMenuOpen }) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef(null);

  /** Controla los estados del sonido para cambiar cuando haces click en el */
  const toggleSound = () => {
    setIsSoundOn((prevState) => !prevState);
  };

  /** Controla el volumen del sonido y lo pone en bucle */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Habilita el bucle
      audioRef.current.volume = 0.3; // Ajusta el volumen al 50%
    }
  }, []); // Solo al montar el componente

  /** Controla la activacion y la desactivacion del sonido de la paguina */
  useEffect(() => {
    if (isSoundOn) {
      console.log("Sonido activado");
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      console.log("Sonido desactivado");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isSoundOn]);

  return (
    <div 
      id="bloque-sonido" 
      onClick={toggleSound} 
      style={{
        opacity: isMenuOpen ? 0 : 1,
        transition: 'opacity 0.3s ease',
        pointerEvents: isMenuOpen ? 'none' : 'auto',
      }}
    >
      <div id="sonido">
        <p>Sonido</p>
      </div>
      <div id="cuadro" className={isSoundOn ? "activo" : "inactivo"}>
        <div className="barra"></div>
        <div className="barra"></div>
        <div className="barra"></div>
        <div className="barra"></div>
      </div>
      <audio ref={audioRef} src={asset("audio/Sea Waves - Sound Effect.mp3")}></audio>
    </div>
  );
};

export default Sonido;