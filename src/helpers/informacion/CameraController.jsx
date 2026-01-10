import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export function CameraController({
    targetPosition,
    targetRotation,
    cameraX,
    xLimit,
    zDepth,
    enableControls,
    onCameraUpdate,
    isDragging,
    isWobbleActive
}) {
    const { camera } = useThree();
    const initialPosition = useRef(new THREE.Vector3(0, 1.6, 6.5));
    const initialRotation = useRef(new THREE.Euler(0, 0, 0));
    const wobbleStrength = 0.01;
    const time = useRef(0);
    const wobbleStartTime = useRef(0);
    const wobbleDuration = 6;
    const ANIMATION_SPEED = 0.3; // Controla la suavidad de las animaciones


    useFrame((_, delta) => {
        console.log(enableControls, "controles")
        time.current += delta;

        const wobbleX = Math.sin(time.current * 1) * wobbleStrength;
        const wobbleY = Math.cos(time.current * 1) * wobbleStrength;

        // Si hay una posición objetivo
        if (targetPosition) {
            // Interpola la posición de la cámara hacia el objetivo
            camera.position.lerp(targetPosition, 0.05);

        } else if (enableControls) {
            // Movimiento dinámico con wobble constante y límites de cámara
            const x = THREE.MathUtils.clamp(
                initialPosition.current.x + cameraX + wobbleX,
                -xLimit,
                xLimit
            );

            const normalizedX = Math.abs(x) / xLimit;
            const z = initialPosition.current.z - zDepth * (0.05 - normalizedX);

            camera.position.set(x, initialPosition.current.y + wobbleY, z);
        }
        // Llama siempre a onCameraUpdate para actualizar la cámara
        onCameraUpdate(camera.position, camera.rotation);
    });

    useEffect(() => {
        if (enableControls) {
            wobbleStartTime.current = time.current;
        }
    }, [enableControls]);

    return null;
}