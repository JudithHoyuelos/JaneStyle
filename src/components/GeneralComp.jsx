import React from "react";
import clsx from "clsx";
import styles from "@/styles/spinner.module.css";
import DotsStyles from "@/styles/dots.module.css";

/**
 * Componente Spinner
 * Muestra un spinner de carga cuando `isVisible` es `true`.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isVisible - Determina si el spinner debe mostrarse.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element|null} Elemento de spinner o `null` si no es visible.
 */
export function Spinner({ isVisible, className, ...props }) {
  if (!isVisible) return null;

  return <div className={clsx(styles.spinner, className)} {...props}></div>;
}

/**
 * Componente DotsLoader
 * Muestra una animación de puntos suspensivos cuando `isVisible` es `true`.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isVisible - Determina si debe mostrarse.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element|null} Elemento animado o `null` si no es visible.
 */
export function DotsLoader({ isVisible, className, ...props }) {
  if (!isVisible) return null;

  return (
    <>

        <div className={clsx(DotsStyles.dots, className)} {...props}></div>

    </>
  );
}


/**
 * Componente DotsLoader2
 * Alternativa de animación con tres puntos pulsantes.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isVisible - Determina si debe mostrarse.
 * @returns {JSX.Element|null} Elemento animado o `null` si no es visible.
 */
const DotsLoader2 = ({ isVisible}) => {
  if (!isVisible) return null;
  return (
    <div className="p-2 text-sm py-4 break-words flex gap-1 bg-gray-200 rounded-lg max-w-[75%] px-4 text-left w-fit shadow-lg shadow-black/20">
      <div className="w-2 h-2 bg-black rounded-full animate-pulse opacity-30" style={{ animationDelay: "0s" }}></div>
      <div className="w-2 h-2 bg-black rounded-full animate-pulse opacity-30" style={{ animationDelay: "0.2s" }}></div>
      <div className="w-2 h-2 bg-black rounded-full animate-pulse opacity-30" style={{ animationDelay: "0.4s" }}></div>
    </div>
  );
};

export default DotsLoader2;

/**
 * Componente Divider
 * Línea divisoria horizontal estilizada.
 *
 * @component
 * @returns {JSX.Element} Elemento `div` que actúa como divisor visual.
 */
export function Divider() {
  return <div className="w-4/5 mx-auto border-t-2 border-gray-700"></div>;
}

/**
 * Componente ContainerCenter
 * Contenedor centrado en la pantalla con posicionamiento absoluto.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido interno.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} Contenedor centrado.
 */
export function ContainerCenter({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "fixed p-3 z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full min-w-[300px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Componente ContainerCenterFullScreen
 * Contenedor que centra vertical y horizontalmente al hijo usando `flex`.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido interno.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} Contenedor centrado a pantalla completa.
 */
export function ContainerCenterFullScreen({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center min-h-screen",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
