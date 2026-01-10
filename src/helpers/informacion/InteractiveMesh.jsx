import * as THREE from "three";
import React, { useState, useEffect, useCallback } from "react";
import { Html } from "@react-three/drei";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import * as alvy from "@/lib/alvy";

// funcion para que alvi funcione (es posible que se quite cuando este el chatbot)
export function InteractiveMesh() {
    const [isConnected, setIsConnected] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const { onRecordStart, isRecording } = useAudioRecorder();

    // Lógica para reconectar con `alvy`
    const checkAndReconnect = useCallback(async () => {
        if (!alvy.isConnected()) {
            try {
                await alvy.startConnection();
                setIsConnected(true);
                // setStatusMessage("Conectado a Alvy");
            } catch (error) {
                setIsConnected(false);
                setStatusMessage("Fallo al conectar con Alvy");
            }
        } else {
            setIsConnected(true);
        }
    }, []);

    // Escuchar respuestas de `alvy`
    useEffect(() => {
        const handleResponse = (message) => {
            if (message.command === "audio" && message.message) {
                const audioElement = new Audio(URL.createObjectURL(message.message));
                audioElement.play().catch(() => setStatusMessage("Error al reproducir audio"));
            }
        };

        alvy.onResponse(handleResponse);
        checkAndReconnect();

        return () => {
            alvy.closeConnection();
        };
    }, [checkAndReconnect]);
    const handleClick = async () => {
        // setStatusMessage("Intentando conectar...");
        await checkAndReconnect();

        if (isConnected) {
            onRecordStart();
            // setStatusMessage("Grabando...");-2.3, 1.5, 5
        }
    };
    return (
        <mesh

            position={[-2.95, 1.5, 4]}
            onClick={handleClick}
            scale={[0.7, 1, 0.9]}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial transparent opacity={0} />


            {statusMessage && (
                <Html center>
                    <div
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            pointerEvents: "none",
                        }}
                    >
                        {statusMessage}
                    </div>
                </Html>
            )}
        </mesh>
    );
}