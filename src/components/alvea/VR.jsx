import React from "react";
import ButtonLat from "../common/Buttons/ButtonLat";

/**
 * Componente VR
 *
 * Renderiza un botón que permite entrar en modo VR (Realidad Virtual).
 * Al hacer clic, busca el elemento <a-scene> en el DOM y llama a su método enterVR() si existe.
 *
 * @returns {JSX.Element} Botón para activar modo VR.
 */
export function VR() {
  const handleClick = () => {
    const scene = document.querySelector("a-scene");
    if (scene) {
      scene.enterVR();
    }
  };
  return (
    <ButtonLat
      action={handleClick}
      imgURL="/img/icons/vr-glasses.svg"
      imgAlt="Icono de VR"
    />
  );
}