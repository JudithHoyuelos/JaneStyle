import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
    OceanComponent,
    SkyComponent,
} from "@/components/SceneComp";
import { portals } from "@/constants/portal";
import { PortalWithImage } from "@/helpers/landing/PortalWithImage";

/**
 * Componente que renderiza los portales en una escena 3D con movimiento circular animado,
 * controlando su visibilidad, posición y foco de cámara según el ángulo y el estado de interacción.
 *
 * @param {Object} props - Props del componente.
 * @param {boolean} props.isDragging - Indica si el usuario está arrastrando (rotando manualmente) los portales.
 * @param {number} props.angle - Ángulo actual de rotación de los portales.
 * @param {Function} props.setAngle - Función para actualizar el ángulo de rotación.
 * @param {number} props.targetAngle - Ángulo objetivo al que se quiere rotar automáticamente.
 * @param {{ width: number, height: number }} props.windowSize - Tamaño actual de la ventana del navegador.
 * @param {number} props.cameraTargetY - Posición vertical objetivo para la cámara.
 * @param {boolean} props.isAnimating - Indica si la cámara debe animar hacia el objetivo vertical.
 *
 * @returns {JSX.Element} Escena 3D con cielo, océano, luces y portales posicionados dinámicamente.
 */
export function PortalesContent({
    isDragging,
    angle,
    setAngle,
    targetAngle,
    windowSize,
    cameraTargetY,
    isAnimating
}) {
    const { camera } = useThree();
    const velocityRef = useRef(0); // Velocidad de rotación suave
    const isMobile = windowSize.width <= 768;
    const portalRadius = 1;

    // Calcula las posiciones circulares de los portales alrededor del origen
    const portalPositions = Array.from({ length: portals.length }, (_, i) => {
        const angleOffset =
            (i * Math.PI * 2) / portals.length - Math.PI / 2 + angle;
        return [
            Math.cos(angleOffset) * portalRadius,
            2,
            Math.sin(angleOffset) * portalRadius,
        ];
    });

    // Calcula la distancia de cada portal a la cámara
    const distances = portalPositions.map((position) => {
        const dx = position[0] - camera.position.x;
        const dy = position[1] - camera.position.y;
        const dz = position[2] - camera.position.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    });

    // Encuentra el portal más lejano a la cámara (para hacerlo clicable)
    const maxDistanceIndex = distances.indexOf(Math.max(...distances));

    // Actualiza la cámara y ángulo de rotación en cada frame
    useFrame(() => {
        if (!isDragging) {
            const diff = targetAngle - angle;
            const speedBoost =
                Math.abs(diff) > ((Math.PI * 2) / portals.length) * 0.5 ? 1.5 : 1;
            velocityRef.current += diff * 0.1 * speedBoost;
            velocityRef.current *= 0.4;
            setAngle((prev) => prev + velocityRef.current);
        }

        // Movimiento vertical suave de la cámara si está animando
        if (isAnimating) {
            camera.position.y += (cameraTargetY - camera.position.y) * 0.1;
        } else {
            camera.position.y = cameraTargetY;
        }

        // Posición fija en X y Z para mantener enfoque frontal
        camera.position.x = 0;
        camera.position.z = 0.8;
    });

    return (
        <>
            <SkyComponent />
            <OceanComponent />
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 5, -5]} intensity={0.1} castShadow />

            {portalPositions.map((position, index) => (
                <PortalWithImage
                    key={index}
                    texture={portals[index].texture}
                    position={position}
                    name={portals[index].name}
                    url={portals[index].url}
                    isClickable={index === maxDistanceIndex}
                    isMobile={isMobile}
                    modelUrl={portals[index].modelUrl}
                    modelScale={portals[index].modelScale}
                    isGlass={portals[index].isGlass}
                />
            ))}
        </>
    );
}
