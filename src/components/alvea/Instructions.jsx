import React from "react";
import glassStyles from "@/styles/card-glass.module.css";
import ButtonLat from "../common/Buttons/ButtonLat";
import ButtonClose from "../common/Buttons/ButtonClose";
import { ContainerCenter } from "../GeneralComp";

/**
 * Componente Instructions
 *
 * Muestra un botón flotante con un icono de ayuda. Al hacer clic, se despliega
 * una tarjeta con instrucciones sobre cómo interactuar con el entorno.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isVisible - Indica si el panel de instrucciones debe mostrarse.
 * @param {Function} props.onOpen - Función que se ejecuta al abrir o cerrar el panel.
 * @returns {JSX.Element} Componente de instrucciones renderizado.
 */
export function Instructions({ isVisible, onOpen }) {
  return (
    <>
      <ButtonLat
        action={onOpen}
        imgURL="/img/icons/question.svg"
        imgAlt="Icono de instrucciones"
      />
      {isVisible && (
        <ContainerCenter>
          <div className={`${glassStyles["card-glass"]} mb-10 mt-10`}>
            <ButtonClose action={onOpen} />
            <div className="flex flex-col gap-6">
              <h2 className="text-xl lg:text-2xl font-bold text-center">Instrucciones</h2>
              <div className="flex flex-col items-center text-center">
                <img
                  src="img/keys.png"
                  alt="Teclas del teclado"
                  className="keys lg:h-16 h-12 w-auto"
                />
                <p>
                  Muévete en la Alvea presionando las teclas de las flechas o
                  utilizando el joystick.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="img/alvirobot.png"
                  alt="Arrastrar y soltar"
                  className="lg:h-16 h-12 w-auto"
                />
                <p>
                  Haz clic sobre AlvyAI para empezar a grabar tu voz. La
                  grabación se detendrá automáticamente al detectar silencio, y
                  recibirás una respuesta de la IA en forma de audio.
                </p>
              </div>
              <div className="flex-col flex items-center text-center">
                <img
                  src="img/drag-and-drop.png"
                  alt="Arrastrar y soltar"
                  className="lg:h-16 h-12 w-auto"
                />
                <p>
                  Puedes mover la vista arrastrando el ratón en ordenador o
                  deslizando lateralmente en móvil.
                </p>
              </div>
            </div>
          </div>
        </ContainerCenter>
      )}
    </>
  );
}
