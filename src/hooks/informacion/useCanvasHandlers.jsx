import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSidebar } from "@/components/Navbar/SidebarContext";

export function useCanvasHandlers({ cameraX, setCameraX, xLimit, enableControls }) {
    const isDragging = useRef(false);
    const previousMouseX = useRef(0);
    const velocity = useRef(0);
    const lastTime = useRef(performance.now());

    const {
        currentCameraPosition,
        currentCameraRotation,
    } = useSidebar();

    const handleCameraUpdate = (position, rotation) => {
        currentCameraPosition.current.copy(position);
        currentCameraRotation.current.copy(rotation);
    };

    // HANDLERS PARA MOUSE
    const handlePointerDown = (event) => {
        if (enableControls) {
            isDragging.current = true;
            previousMouseX.current = event.clientX;
            velocity.current = 0;
            lastTime.current = performance.now();
        }
    };

    const handlePointerMove = (event) => {
        if (isDragging.current && enableControls) {
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime.current) / 1000;
            const deltaX = event.clientX - previousMouseX.current;
            const dragSensitivity = window.innerWidth < 376 ? 0.19 : 0.01;
            const newX = cameraX - deltaX * dragSensitivity;
            setCameraX(THREE.MathUtils.clamp(newX, -xLimit, xLimit));

            velocity.current = (deltaX * dragSensitivity) / deltaTime;

            previousMouseX.current = event.clientX;
            lastTime.current = currentTime;
        }
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    // HANDLERS PARA TOUCH
    const handleTouchStart = (event) => {
        if (enableControls) {
            isDragging.current = true;
            previousMouseX.current = event.touches[0].clientX;
            velocity.current = 0;
            lastTime.current = performance.now();
        }
    };

    const handleTouchMove = (event) => {
        if (isDragging.current && enableControls) {
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime.current) / 1000;
            const deltaX = event.touches[0].clientX - previousMouseX.current;
            const dragSensitivity = window.innerWidth < 376 ? 0.03 : 0.01;
            const newX = cameraX - deltaX * dragSensitivity;
            setCameraX(THREE.MathUtils.clamp(newX, -xLimit, xLimit));

            velocity.current = (deltaX * dragSensitivity) / deltaTime;

            previousMouseX.current = event.touches[0].clientX;
            lastTime.current = currentTime;
        }
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    // EFECTO PARA INERCIA
    useEffect(() => {
        let animationFrameId;

        const applyInertia = () => {
            if (enableControls && !isDragging.current && Math.abs(velocity.current) > 0.0001) {
                setCameraX((prevX) => {
                    const newX = prevX - velocity.current * 0.016;
                    return THREE.MathUtils.clamp(newX, -xLimit, xLimit);
                });

                velocity.current *= 0.89;
            }

            animationFrameId = requestAnimationFrame(applyInertia);
        };

        applyInertia();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [xLimit, enableControls]);

    return {
        handleCameraUpdate,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        isDragging,
    };
}