import { Sparkles } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import ModSparkles from '@/components/ModSparkles';



export default function RecursiveSparkle({ offset = 10, followAxis = 'z', range = 40 }) {
  const { camera } = useThree();
  const [sparkleGroups, setSparkleGroups] = useState([]);
  const idCounter = useRef(0);

  /**
   *  @description Habilita los layers 0 (por defecto) y 1 (para sparkles) en la cámara.
   * Esto permite que la cámara pueda renderizar ambos layers,
   * incluso si el efecto de postprocesamiento se limita a uno de ellos.
   */
  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  /**
   * @description Crea un nuevo grupo de partículas en la posición indicada.
   * Cada grupo tiene una referencia única y un identificador.
   * @param {number} positionValue - Posición en el eje especificado para el grupo de partículas.
   * @returns {Object} Objeto que representa el grupo con id, posición y referencia.
   */
  const createSparkleGroup = (positionValue) => {
    const groupRef = React.createRef();

    const group = {
      id: idCounter.current++,
      position: positionValue,
      ref: groupRef,
    };

    return group;
  };

  /**
   * @description Ejecutado en cada frame para:
   * 1. Calcular la posición actual de la cámara.
   * 2. Generar nuevos grupos de partículas delante y detrás dentro del rango definido.
   * 3. Eliminar grupos que están demasiado lejos para optimizar la escena.
   * Esto asegura que las partículas se generen antes de ser visibles y que la escena no se sobrecargue.
   */
  useFrame(() => {
    const camPos = camera.position[followAxis];
    const currentSection = Math.floor(camPos / offset) * offset;

    const neededPositions = [];
    for (let i = -range; i <= range; i += offset) {
      neededPositions.push(currentSection + i);
    }

    neededPositions.forEach((pos) => {
      const alreadyExists = sparkleGroups.some((group) => group.position === pos);
      if (!alreadyExists) {
        const newGroup = createSparkleGroup(pos);
        setSparkleGroups((prev) => [...prev, newGroup]);
      }
    });

    setSparkleGroups((prev) =>
      prev.filter((group) => {
        const distance = group.position - camPos;
        return Math.abs(distance) <= range * 1.5;
      })
    );
  });

  /**
   * @description Asigna el layer 1 a todos los objetos hijos dentro de cada grupo de sparkles.
   * Esto evita que los `Sparkles` sean afectados por efectos de postprocesamiento como `Bloom`
   * cuando este se aplica únicamente al layer 0.
   */
  useEffect(() => {
    sparkleGroups.forEach((group) => {
      if (group.ref.current) {
        group.ref.current.traverse((child) => {
          if (child instanceof THREE.Object3D) child.layers.set(1);
        });
      }
    });
  }, [sparkleGroups]);

  return (
    <>
      {sparkleGroups.map((group) => (
        <group
          key={group.id}
          ref={group.ref}
          position={
            followAxis === 'z'
              ? [0, 0, group.position]
              : followAxis === 'x'
                ? [group.position, 0, 0]
                : [0, group.position, 0]
          }
        >
          <ModSparkles
            key={`mod-sparkles-${group.id}`}
            count={100}
            size={25}
            speed={0.6}
            scale={40}
            opacity={1}
          />
        </group>
      ))}
    </>
  );
}
