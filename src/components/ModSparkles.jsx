import React, { useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

class SparklesImplMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: 1 },
            },
            vertexShader: `
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

          // Corta los fragmentos fuera del círculo
          //if (distanceToCenter > 0.5) discard;

         // Intensity (glow-like falloff)
        float strength = 0.01 / distanceToCenter - 0.1;

        // Usa alpha real (puedes ajustar el multiplicador de strength si quieres menos glow)
        float alpha = clamp(strength * vOpacity, 0.0, 1.0);

        gl_FragColor = vec4(vColor, alpha);
        //gl_FragColor = vec4(vColor, strength * vOpacity);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }
        `,
            transparent: true,
            depthWrite: false,
        });
    }

    get time() {
        return this.uniforms.time.value;
    }
    set time(value) {
        this.uniforms.time.value = value;
    }
    get pixelRatio() {
        return this.uniforms.pixelRatio.value;
    }
    set pixelRatio(value) {
        this.uniforms.pixelRatio.value = value;
    }
}

extend({ SparklesImplMaterial });

const isFloat32Array = (v) => v && v.constructor === Float32Array;
const expandColor = (v) => [v.r, v.g, v.b];
const isVector = (v) => v instanceof THREE.Vector2 || v instanceof THREE.Vector3 || v instanceof THREE.Vector4;
const normalizeVector = (v) => Array.isArray(v) ? v : isVector(v) ? v.toArray() : [v, v, v];

function useProp(count, prop, def) {
    return useMemo(() => {
        if (prop !== undefined) {
            if (isFloat32Array(prop)) return prop;
            if (prop instanceof THREE.Color) {
                return Float32Array.from(Array.from({ length: count }, () => expandColor(prop)).flat());
            }
            if (isVector(prop) || Array.isArray(prop)) {
                return Float32Array.from(Array.from({ length: count }, () => normalizeVector(prop)).flat());
            }
            return Float32Array.from({ length: count }, () => prop);
        }
        return Float32Array.from({ length: count }, def);
    }, [count, prop]);
}

const ModSparkles = forwardRef(({
    count = 100,
    speed = 1,
    opacity = 1,
    color = new THREE.Color("white"),
    size,
    scale = 1,
    noise = 1,
    ...props
}, ref) => {
    const internalRef = useRef();
    const dpr = useThree((s) => s.viewport.dpr);
    const _scale = normalizeVector(scale);

    const positions = useMemo(() => {
        return Float32Array.from(Array.from({ length: count }, () => _scale.map(THREE.MathUtils.randFloatSpread)).flat());
    }, [count, scale]);

    const sizes = useProp(count, size, () => Math.random());
    const opacities = useProp(count, opacity);
    const speeds = useProp(count, speed);
    const noises = useProp(count * 3, noise);
    const colors = useProp(color === undefined ? count * 3 : count, !isFloat32Array(color) ? new THREE.Color(color) : color, () => 1);

    useFrame((state) => {
        if (internalRef.current && internalRef.current.material) {
            internalRef.current.material.time = state.clock.elapsedTime;
        }
    });

    useImperativeHandle(ref, () => internalRef.current);

    return (
        <points ref={internalRef} {...props}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
                <bufferAttribute attach="attributes-opacity" args={[opacities, 1]} />
                <bufferAttribute attach="attributes-speed" args={[speeds, 1]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                <bufferAttribute attach="attributes-noise" args={[noises, 3]} />
            </bufferGeometry>
            <sparklesImplMaterial pixelRatio={dpr} />
        </points>
    );
});

ModSparkles.displayName = "ModSparkles";

export default ModSparkles;