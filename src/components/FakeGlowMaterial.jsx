import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color, AdditiveBlending } from 'three'

/**
 * Componente `FakeGlowMaterial`
 * 
 * Este material personalizado simula un resplandor falso (fake glow) en objetos 3D utilizando shaders GLSL.
 * Ideal para efectos visuales llamativos como luces, auras o energía alrededor de un objeto.
 * 
 * @param {Object} props - Propiedades para configurar el material.
 * @param {number} [props.falloff=0.1] - Controla la atenuación del brillo en los bordes.
 * @param {number} [props.glowInternalRadius=5.0] - Define el radio interno donde inicia el brillo.
 * @param {string} [props.glowColor='#ffffff'] - Color del resplandor.
 * @param {number} [props.glowSharpness=0.0] - Intensifica el borde del resplandor (como un "borde duro").
 * @param {string} [props.side='THREE.FrontSide'] - Lado del objeto al que se aplica el material.
 * @param {boolean} [props.depthTest=false] - Controla si se considera la profundidad de escena.
 * @param {number} [props.opacity=0.5] - Opacidad máxima del glow.
 */
const FakeGlowMaterial = ({
  falloff = 0.1,
  glowInternalRadius = 5.0,
  glowColor = '#ffffff',
  glowSharpness = 0.0,
  side = 'THREE.FrontSide',
  depthTest = false,
  opacity = 0.5,
}) => {
  const FakeGlowMaterial = useMemo(() => {
    return shaderMaterial(
      {
        falloffAmount: falloff,
        glowInternalRadius: glowInternalRadius,
        glowColor: new Color(glowColor),
        glowSharpness: glowSharpness,
        opacity: opacity,
      },
      /*GLSL */
      `
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
        vPosition = modelPosition.xyz;
        vNormal = modelNormal.xyz;
      }`,
      /*GLSL */
      ` 
      uniform vec3 glowColor;
      uniform float falloffAmount;
      uniform float glowSharpness;
      uniform float glowInternalRadius;
      uniform float opacity;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main()
      {
        // Calcula la distancia desde el centro del objeto (vPosition es la posición global del fragmento)
        float distToCenter = length(vPosition); // Distancia al centro
        // Ajusta el brillo basado en la distancia al centro
        float glowFactor = 1.0 - smoothstep(glowInternalRadius, glowInternalRadius + 1.0, distToCenter);
        
        // Cálculo de fresnel basado en la normal (como en el ejemplo anterior)
        vec3 normal = normalize(vNormal);
        if(!gl_FrontFacing)
            normal *= - 1.0;
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = dot(viewDirection, normal);
        fresnel = pow(fresnel, glowInternalRadius + 0.1);
        
        // Aplica el efecto de falloff
        float falloff = smoothstep(0., falloffAmount, fresnel);
        
        // Fake glow modificado para que dependa de la distancia al centro
        float fakeGlow = glowFactor * fresnel;
        fakeGlow += fresnel * glowSharpness;
        fakeGlow *= falloff;

        // Establece el color y la opacidad final del resplandor
        gl_FragColor = vec4(clamp(glowColor * fakeGlow, 0., 1.0), clamp(fakeGlow, 0., opacity));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
    )
  }, [falloff, glowInternalRadius, glowColor, glowSharpness, opacity])

  extend({ FakeGlowMaterial })

  return (
    <fakeGlowMaterial
      key={FakeGlowMaterial.key}
      side={side}
      transparent={true}
      blending={AdditiveBlending}
      depthTest={depthTest}
    />
  )
}

FakeGlowMaterial.propTypes = {
  falloff: PropTypes.number,
  glowInternalRadius: PropTypes.number,
  glowColor: PropTypes.string,
  glowSharpness: PropTypes.number,
  side: PropTypes.oneOf([
    'THREE.FrontSide',
    'THREE.BackSide',
    'THREE.DoubleSide',
  ]),
}

export default FakeGlowMaterial
