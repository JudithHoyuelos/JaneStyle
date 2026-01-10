"use client";
import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, FrontSide } from "three";
import { useProcessedImageURL } from "@/hooks/useProcessedImageURL";

/**
 * Componente que renderiza una imagen 2D como un plano en una escena 3D de Three.js
 * con fondo eliminado (procesado) y efectos como transparencia, orden de renderizado y clics.
 *
 * @component
 *
 * @param {Object} props - Props del componente.
 * @param {string} props.url - URL original de la imagen a renderizar.
 * @param {[number, number, number]} props.position - Posición del plano en el espacio 3D.
 * @param {[number, number, number]} [props.scale=[1,1,1]] - Escala del plano en cada eje.
 * @param {[number, number, number]} [props.rotation=[0,0,0]] - Rotación del plano (en radianes).
 * @param {number} [props.renderOrder=1] - Orden de renderizado para controlar la superposición.
 * @param {"tree"|"mountain"} [props.mode="tree"] - Modo de eliminación de fondo ("tree" para árboles, "mountain" para montañas).
 * @param {function|null} [props.onClick=null] - Callback opcional para manejar clics sobre el plano.
 *
 * @returns {JSX.Element|null} El plano con la imagen renderizada como textura, o `null` si aún no está lista.
 *
 * @example
 * <FoggedImageCanvas
 *   url="/images/arbol.png"
 *   position={[0, 1, -5]}
 *   scale={[2, 2, 1]}
 *   mode="tree"
 *   onClick={() => console.log("Imagen clicada")}
 * />
 */

export default function FoggedImageCanvas({
  url,
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  renderOrder = 1,
  mode = "tree",
  onClick = null,
}) {
  // Aquí se procesa la URL para eliminar el fondo o cualquier preprocesamiento
  const processedURL = useProcessedImageURL(url, mode);

  // Mientras se procesa la imagen, no renderiza nada
  //  if (!processedURL) return null;

  // Carga la textura de la imagen procesada
  const texture = useLoader(TextureLoader, processedURL || url );

  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      renderOrder={renderOrder}
      onClick={onClick}
      onPointerDown={onClick}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        alphaTest={0.5}  // Recorta los píxeles casi transparentes
        depthWrite={false}
        depthTest={true}
        side={FrontSide}
      />
    </mesh>
  );
}

