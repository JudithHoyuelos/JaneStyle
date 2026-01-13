import React, { useRef } from "react";
import { Environment, useGLTF } from "@react-three/drei";
import { FrontSide, TextureLoader, Vector3, fogExp2 } from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Ocean } from "./Ocean";
import { asset } from "@/utils/basePath";

/**
 * Componente que carga y clona un modelo 3D.
 * @param {string} url - Ruta del modelo GLTF.
 * @param {Array} position - Posición del modelo [x, y, z].
 * @param {Array} scale - Escala del modelo [x, y, z].
 * @param {Array} rotation - Rotación del modelo [x, y, z].
 */
export function ModelLoader({
  url,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) {
  useGLTF.preload(url);
  const { scene } = useGLTF(url);

  const clonedScene = scene.clone();
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

/**
 * Componente de lienzo Canvas personalizado de react-three-fiber.
 * Permite configurar cámara y estilo.
 */
export function CustomCanvas({
  camera = { position: [0, 2, 0], fov: 75, rotation: [0, 0, 0] },
  style = { width: "100vw", height: "100vh", zIndex: 0 },
  children,
  ...props
}) {
  return (
    <Canvas camera={camera} gl={{ antialias: true }} style={style} {...props}>
      {children}
    </Canvas>
  );
}

/**
 * Aplica un fondo ambiental HDRI 
 */
export function SkyComponent() {
  return <Environment files={asset('img/equirectangular/sky-background-4.hdr')} background />;
}

/**
 * Océano con efecto de reflexión y parámetros personalizados.
 */
export function OceanComponent() {
  return (
    <Ocean
      dimensions={[200, 200]}
      normals="/img/textures/waternormals.jpg"
      distortionScale={1}
      size={3}
      options={{
        clipBias: 0,
        alpha: 1,
        waterNormals: null,
        sunDirection: new Vector3(0.70707, 0.70707, 0),
        sunColor: 0xffc0cb,
        waterColor: 0x274472,
        eye: new Vector3(0, 0, 0),
        distortionScale: 0,
        side: FrontSide,
        fog: true,
      }}
    />
  );
}

/**
 * Muestra una imagen como plano 3D con efecto de niebla.
 */
export function FoggedImage({ url, ...props }) {
  const texture = useLoader(TextureLoader, url);

  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={texture} transparent={true} fog={true} />
    </mesh>
  );
}

export function ModFog({ color = "#3B004F", density = 0.008 }) {
  return <fogExp2 attach="fog" color={color} density={density} />;
}

export function R3Floader() {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 2, -5]}>
        <ModelLoader url="/models/logoAlvearium.gltf" scale={10} />
        <ambientLight intensity={2} />
      </mesh>
    </group>
  );
}

export function LoaderCanvas({ children }) {
  return (
    <CustomCanvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "white",
      }}
      gl={{ clearColor: [1, 1, 1, 1] }}
    >
      {children}
    </CustomCanvas>
  );
}
