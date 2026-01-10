import React, { useRef, useState } from "react";
import Model from "@/helpers/landing/Model";
import { Html, useTexture } from "@react-three/drei";
import { useRouter } from "next/navigation";
import FakeGlowMaterial from "@/components/FakeGlowMaterial.jsx";
import * as THREE from "three";

/**
 * Componente 3D que representa un portal interactivo con textura o efecto de vidrio,
 * modelo 3D opcional y nombre flotante. Puede redirigir al usuario a una URL al hacer clic.
 *
 * @param {Object} props - Props del componente.
 * @param {string} props.texture - Ruta de la textura para el portal (si no es de vidrio).
 * @param {[number, number, number]} props.position - Posición 3D del portal.
 * @param {string} props.url - URL de destino al hacer clic en el portal.
 * @param {string} props.name - Nombre visible del portal.
 * @param {boolean} props.isClickable - Indica si el portal es clicable.
 * @param {boolean} props.isMobile - Indica si se está en un dispositivo móvil (evita efectos hover).
 * @param {string} [props.modelUrl] - Ruta del modelo 3D opcional dentro del portal.
 * @param {[number, number, number]} [props.modelScale] - Escala del modelo 3D.
 * @param {boolean} [props.isGlass] - Si `true`, el portal tiene apariencia de vidrio en lugar de textura.
 *
 * @returns {JSX.Element} Portal interactivo con efectos visuales y contenido opcional.
 */
export function PortalWithImage({
    texture,
    position,
    url,
    name,
    isClickable,
    isMobile,
    modelUrl,
    modelScale,
    isGlass,
}) {
    const map = useTexture(texture); // Carga la textura del portal
    const portalRef = useRef();      // Referencia al grupo del portal
    const [hovered, setHovered] = useState(false); // Estado de hover
    const router = useRouter();      // Enrutador de Next.js

    /**
     * Maneja el clic en el portal si es clicable.
     */
    const handleClick = () => {
        if (isClickable) {
            console.log(`Navegando a ${url}`);
            router.push(url);
        }
    };

    const sphereRadius = 0.25;

    return (
        <group position={position} ref={portalRef}>
            {/* Esfera principal del portal */}
            <mesh
                onClick={handleClick}
                onPointerOver={!isMobile ? () => setHovered(true) : null}
                onPointerOut={!isMobile ? () => setHovered(false) : null}
            >
                <sphereGeometry args={[sphereRadius, 32, 32]} />
                {isGlass ? (
                    // Material translúcido tipo vidrio
                    <meshPhysicalMaterial
                        color={"white"}
                        roughness={0}
                        transmission={0.9}
                        thickness={0.5}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        reflectivity={0}
                    />
                ) : (
                    // Material con textura para portales normales
                    <meshStandardMaterial
                        map={map}
                        side={THREE.BackSide}
                        transparent
                        opacity={2}
                    />
                )}
            </mesh>

            {/* Modelo 3D opcional dentro del portal */}
            {modelUrl && (
                <Model url={modelUrl} position={[0, -0.077, 0]} scale={modelScale} />
            )}

            {/* Texto "Próximamente" si es vidrio y clicable */}
            {isGlass && isClickable && (
                <Html center
                zIndexRange={[0, 0]}>
                    <div
                        style={{
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            textAlign: "center",
                            userSelect: "none",
                        }}
                    >
                        Próximamente
                    </div>
                </Html>
            )}

            {/* Efecto de resplandor exterior al hacer hover */}
            <mesh>
                <sphereGeometry args={[sphereRadius + 0.5, 32, 32]} />
                <FakeGlowMaterial
                    falloff={hovered ? 10 : 0.0}
                    glowInternalRadius={hovered ? 3 : 0.0}
                    glowColor={"#ffffff"}
                    glowSharpness={hovered ? 10 : 0.0}
                    opacity={hovered ? 1 : 0.0}
                />
            </mesh>

            {/* Nombre del portal flotante */}
            <group position={[0, 0.3, 0]}>
                <Html center
                zIndexRange={[0, 0]}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                color: "white",
                                fontSize: "25px",
                                fontWeight: "bold",
                                userSelect: "none",
                                whiteSpace: "nowrap",
                                opacity: hovered ? 1 : 0.5,
                                transition: "opacity 0.2s ease-in-out",
                            }}
                            className="titulos-portales"
                        >
                            {name}
                        </div>
                    </div>
                </Html>
            </group>
        </group>
    );
}
