import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = ({ url, position, scale }) => {
    const gltf = useLoader(GLTFLoader, url); // Cargar el modelo GLTF
    return (
        <group position={position} scale={scale}>
            <primitive object={gltf.scene} /> {/* Renderizar la escena del modelo */}
        </group>
    );
};

export default Model;