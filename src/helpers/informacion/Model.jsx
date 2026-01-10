import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

// funcion para poner el modelo 3D de alvi (posiblemente se borre cuando este el chatbot)
const Model = ({ url, position, scale, target }) => {
    const gltf = useLoader(GLTFLoader, url); // Cargar el modelo GLTF
    const modelRef = useRef(); // Ref para el modelo

    // Efecto para implementar levitación y lookAt
    useFrame(({ clock, camera }) => {
        if (modelRef.current) {
            // Lógica de levitación
            const time = clock.getElapsedTime();
            modelRef.current.position.y = position[1] + Math.sin(time) * 0.1; // Movimiento de levitación

            // Lógica de lookAt
            const lookTarget = target || camera.position; // Si no hay un target definido, apunta a la cámara
            modelRef.current.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={gltf.scene}
            position={position}
            scale={scale}
        />
    );
};

export default Model;