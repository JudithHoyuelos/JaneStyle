
"use client";
import React, { useMemo } from "react";
import FoggedImageCanvas from "./FoggedImageCanvas"; // Importa tu componente para las imágenes con fondo


/**
 * Altura fija en Y para posicionar los árboles en la escena 3D.
 * @constant {number}
 */
/**export const Y_HEIGHT = 1.5;
 * Genera un conjunto de posiciones para árboles dentro de un rango X,
 * distribuidos con cierta separación en el eje X y descendiendo en Z.
 *
 * @param {number} startX - Coordenada X inicial del rango.
 * @param {number} endX - Coordenada X final del rango.
 * @param {number} [stepX=15] - Espaciado base entre árboles en el eje X.
 * @param {number} zBase - Coordenada Z base para empezar a distribuir árboles.
 * @param {number} count - Número total de árboles a generar.
 * @returns {{x: number, y: number, z: number}[]} Array de objetos de posición para cada árbol.
 *
 * @example
 * const posiciones = generateTreeGroup(-50, 50, 15, -20, 10);
 */


export const Y_HEIGHT = 1.5;

export function generateTreeGroup(startX, endX, stepX = 15, zBase, count) {
  const positions = [];
  const range = Math.floor((endX - startX) / stepX);
  for (let i = 0; i < count; i++) {
    const x = startX + (i % range) * stepX + ((i % 3) - 1) * 2;
    const z = zBase - Math.floor(i / range) * 15 + ((i % 2) - 0.5) * 2;
    positions.push({ x, y: Y_HEIGHT, z });
  }
  return positions;
}
  const treeTypes = [
    { url: "/img/arbolesymontanas/Arbol1.png" },
    { url: "/img/arbolesymontanas/Arbol2.png" },
    { url: "/img/arbolesymontanas/Arbol3.png" },
  ]

export function renderArboles(positions = []) {
    return positions.map(({ x, y, z }, index) => {
    const treeType = treeTypes[index % treeTypes.length];
    return (
      <FoggedImageCanvas
        key={`tree-${index}`}
        url={treeType.url}
        position={[x, y, z]}
        scale={[6, 4, 10]}
        rotation={[0, 0, 0]}
        mode="tree"
      />
    );
  });
}

