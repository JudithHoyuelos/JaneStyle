"use client";

import React, { useMemo } from "react";
import { useCameraControls } from "@/hooks/useCameraControls";
import Sonido from "@/components/informacion/Informacion";
import InicioLogo from "@/components/logo/logo";
import ReturnButton from "@/components/logicaP2/returnbutton";
import withProgressLoader from "@/components/common/Loader/withProgressLoader";
import { generateTreeGroup } from "@/components/Arboles";
import { CustomCanvas, SkyComponent, OceanComponent,ModFog } from "@/components/SceneComp";
import FoggedImageCanvas from "@/components/FoggedImageCanvas";


/**
 * Componente principal de la página P4Promocionar.
 * Renderiza un escenario 3D con árboles y montañas 2D (con fondo eliminado),
 * un cielo, un océano animado, controles de cámara con inercia, niebla, y elementos de UI.
 *
 * Utiliza hooks para generar árboles y montañas como elementos visuales 2D con transparencias,
 * integrados en una escena Three.js con React Three Fiber.
 *
 * @component
 * @returns {JSX.Element} Escena completa renderizada con efectos visuales y UI.
 */


function P4Promocionar() {
  // Hooks de control de cámara con inercia
  const {
    cameraRef,
    isDragging,
    velocityRef,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleCreated,
    CameraInertia,
  } = useCameraControls();

  // Tipos de árboles que se usarán en la escena


  /**
   * Lista de tipos de árboles a usar. Se ciclan en la escena.
   * @type {{url: string}[]}
   */

  const treeTypes = useMemo(() => [
    { url: "/img/arbolesymontanas/Arbol1.png" },
    { url: "/img/arbolesymontanas/Arbol2.png" },
    { url: "/img/arbolesymontanas/Arbol3.png" },
  ], []);

  // Posiciones de los árboles generadas por grupo

  /**
   * Posiciones generadas para ubicar árboles en distintas zonas del mapa.
   * @type {{x: number, y: number, z: number}[]}
   */
  const treePositions = useMemo(() => {
    const leftTrees = generateTreeGroup(-25, -10, 5, -37, 3);
    const centerTreesIzquierda = generateTreeGroup(-15, -5, 5, -70, 2);
    const centerTreesDerecha = generateTreeGroup(55, 80, 5, -55, 2);
    const rightTrees = generateTreeGroup(15, 40, 6, -35, 3);
    return [...leftTrees, ...centerTreesIzquierda, ...centerTreesDerecha, ...rightTrees];
  }, []);

  // Árboles como objetos con propiedades para renderizar

  /**
   * Montañas renderizadas como imágenes 2D con fondo eliminado.
   * @type {{
   *   key: string,
   *   url: string,
   *   position: [number, number, number],
   *   scale: [number, number, number]
   * }[]}
   */

  const trees = useMemo(() => {
    return treePositions.map(({ x, y, z }, index) => {
      const scaleX = 6;
      const scaleY = 4;
      const scaleZ = 10;
      const treeType = treeTypes[index % treeTypes.length];
      return {
        key: `tree-${index}`,
        url: treeType.url,
        position: [x, y, z],
        scale: [scaleX, scaleY, scaleZ],
        rotation: [0, 0, 0],
      };
    });
  }, [treePositions, treeTypes]);

  
  // Montañas con fondo eliminado
  const mountains = useMemo(() => [
    { key: "mountain-1", url: "/img/arbolesymontanas/2DMontana3.png", position: [35, 2, -60], scale: [90, 95, 380] },
    { key: "mountain-2", url: "/img/arbolesymontanas/2DMontana2.png", position: [-35, 1.0, -45], scale: [60, 35, 100] },
    { key: "mountain-3", url: "/img/arbolesymontanas/2DMontana3.png", position: [-25, 2.0, -75], scale: [85, 100, 230] },
    { key: "mountain-4", url: "/img/arbolesymontanas/2DMontana1.png", position: [20, 1.0, -40], scale: [40, 40, 50] },
  ], []);

  return (
    <>
      <CustomCanvas
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onCreated={handleCreated}
      >
        <CameraInertia
          cameraRef={cameraRef}
          velocityRef={velocityRef}
          isDragging={isDragging}
        />
        <SkyComponent />
        <OceanComponent />

        {/* Árboles renderizados como imágenes con fondo eliminado */}
        {trees.map(({ key, url, position, scale, rotation }) => (
          <FoggedImageCanvas
            key={key}
            url={url}
            position={position}
            scale={scale}
            rotation={rotation}
            mode="tree"
          />
        ))}

        {/* Montañas */}
        {mountains.map(({ key, url, position, scale }) => (
          <FoggedImageCanvas
            key={key}
            url={url}
            position={position}
            scale={scale}
            mode="mountain"
          />
        ))}

        <ModFog />
      </CustomCanvas>

      {/* Elementos UI */}
      <Sonido />
      <InicioLogo />
      <ReturnButton />
    </>
  );
}
// Exporta el componente envuelto con un loader de progreso
export default withProgressLoader(P4Promocionar);

