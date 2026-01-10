import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * @description Material shader personalizado para mostrar un video con ondulación suave
 * y desvanecimiento según la distancia de la cámara.
 */
const LonaShaderMaterial = shaderMaterial(
  {
    time: 0,
    map: null,
    fadeProgress: 0.5,
  },

  `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Ondulación suave de la lona
      float waveX = sin(uv.x * 5.0 + time) * 0.03;
      float waveY = cos(uv.y * 5.0 + time) * 0.03;
      pos.z += waveX + waveY;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  `
    uniform sampler2D map;
    uniform float fadeProgress;
    varying vec2 vUv;

    void main() {
      vec4 videoColor = texture2D(map, vUv);
      
      // Color blanco de lona con video superpuesto
      vec3 lonaColor = vec3(0.95); // Blanco hueso suave
      
      // Mezclar video con color de lona
      vec3 finalColor = mix(lonaColor, videoColor.rgb, 0.8);
      
      // ----- Bordes redondeados -----
      float radius = 0.05; // Cuanto más alto, más esquinas redondas (0.0 a 0.5)
      vec2 uv = vUv * 2.0 - 1.0; // UV de [-1,1] para facilitar cálculo

      // Distancia del centro al borde redondeado
      float cornerDist = min(
        min(radius - abs(uv.x - sign(uv.x) * (1.0 - radius)),
          radius - abs(uv.y - sign(uv.y) * (1.0 - radius))),
        0.0
      );

      // Calcular la distancia desde el centro del píxel al borde de un rectángulo con esquinas redondeadas
      vec2 corner = abs(uv) - vec2(1.0 - radius);
      float dist = length(max(corner, 0.0)) - radius;

      // Suavizado del borde (antialiasing)
      float smoothEdge = 0.005;
      float mask = smoothstep(0.0, smoothEdge, -dist);

      // Usar mask como alpha
      float alpha = mask * fadeProgress;

      gl_FragColor = vec4(finalColor, videoColor.a * alpha);
    }
  `
);

extend({ LonaShaderMaterial });

/**
 * @componente VideoButton
 * @descripcion Muestra un botón en forma de lona que reproduce un video
 * con efectos de ondulación y desvanecimiento según la distancia.
 *
 * @param {{
 *   url: string,                     
 *   size: [number, number],          
 *   videoPosition: [number, number, number], 
 *   scenePosition: [number, number, number], 
 * }} props
 */
export function VideoButton({ url, size, videoPosition, scenePosition, isVisible = true }) {

  const videoTexture = useVideoTexture(url);
  const materialRef = useRef();
  const { camera } = useThree();

  /**
   * Se usa la memoria para crear un plano 3D donde ira el video
   *
   * @type {PlaneGeometry}
   */
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(size[0], size[1], 32, 32),
    [size]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.getElapsedTime();

      const distance = camera.position.distanceTo(
        new THREE.Vector3(...scenePosition)
      );
      const fadeStartDistance = 7;
      const fadeEndDistance = 5;

      let fadeProgress;
      if (distance > fadeStartDistance) {
        fadeProgress = 0;
      } else if (distance < fadeEndDistance) {
        fadeProgress = 1;
      } else {
        const t =
          1 -
          (distance - fadeEndDistance) / (fadeStartDistance - fadeEndDistance);
        fadeProgress = Math.pow(t, 3);
      }

      materialRef.current.fadeProgress = fadeProgress;
    }
  });

  if (!isVisible) return null; // ✅ Ya se llamaron los hooks

  return (
    <mesh position={videoPosition} geometry={geometry}>
      <lonaShaderMaterial ref={materialRef} map={videoTexture} transparent />
    </mesh>
  );
}
