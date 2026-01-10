import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { Water } from "three/examples/jsm/Addons";
import { useFrame } from "@react-three/fiber";

export const Ocean = forwardRef(({ 
  dimensions = [1000, 1000], 
  normals, 
  distortionScale = 0.6,
  size = 10, 
  options = {}, 
  ...props 
}, ref) => {
  const [geometry] = useState(() => new PlaneGeometry(...dimensions));

  const normalMap = useMemo(() => {
    if (!normals) return undefined;
    return new TextureLoader().load(normals, texture => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    });
  }, [normals]);

  const [water] = useState(() => (
    new Water(
      geometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: normalMap,
        sunDirection: new Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: distortionScale,
        fog: false,
        ...options
      }
    )
  ));

  useImperativeHandle(ref, () => water);

  useEffect(() => {
    if (water?.material?.uniforms) {
      water.material.uniforms.distortionScale.value = distortionScale;
      water.material.uniforms.size.value = size;
      water.material.uniforms.normalSampler.value = normalMap;
    }
  }, [distortionScale, size, normalMap, water]);
  

  useFrame(() => {
    water.material.uniforms.time.value += 1 / 1000;  
  });

  return (
    <group {...props}>
      <primitive
        object={water}
        rotation-x={-Math.PI / 2}
      />
    </group>
  );
});

Ocean.displayName = "Ocean";