"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Model({ animationName, onAnimationEnd, setStatus }) {
  const { scene, animations } = useGLTF('/models/Alvy AI2.glb');
  const { actions, mixer } = useAnimations(animations, scene);
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    setStatus(`Reproduciendo animación: ${animationName}`);

    if (actions && actions[animationName]) {
      const newAction = actions[animationName];
      const fadeDuration = 0.5;

      if (currentAction) {
        currentAction.crossFadeTo(newAction, fadeDuration, false);
      }

      newAction.reset().fadeIn(fadeDuration).play();
      newAction.clampWhenFinished = true;
      newAction.loop = THREE.LoopOnce;
      setCurrentAction(newAction);

      const onFinished = (event) => {
        if (event.action === newAction) {
          setStatus(`Animación terminada: ${animationName}`);
          onAnimationEnd();
        }
      };

      mixer.addEventListener('finished', onFinished);
      return () => {
        mixer.removeEventListener('finished', onFinished);
      };
    }
  }, [actions, animationName, onAnimationEnd, mixer, setStatus]);

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     const { innerWidth, innerHeight } = window;
  //     const x = (event.clientX / innerWidth) * 2 - 1;
  //     const y = (event.clientY / innerHeight) * 2 - 1;
  //     scene.rotation.y = x * 1;
  //     scene.rotation.x = y * 1;
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, [scene]);

  return <primitive object={scene} />;
}

export default function App() {
  const animationList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "11 v2", "6 v2", "ArmatureAction.004"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overrideAnimation, setOverrideAnimation] = useState(null);
  const [resumeIndex, setResumeIndex] = useState(null);
  const [selectedAnimation, setSelectedAnimation] = useState(animationList[0]);
  const [status, setStatus] = useState("Listo");

  const handleAnimationEnd = () => {
    if (overrideAnimation) {
      setCurrentIndex(resumeIndex !== null ? resumeIndex : currentIndex + 1);
      setOverrideAnimation(null);
      setResumeIndex(null);
    } else {
      const nextIndex = (currentIndex + 1) % animationList.length;
      setCurrentIndex(nextIndex);
    }
  };

  const triggerAnimation = () => {
    setOverrideAnimation(selectedAnimation);
    setResumeIndex(currentIndex + 1);
  };

  return (
    <>
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="sunset" background />
        <Model animationName={overrideAnimation || animationList[currentIndex]} onAnimationEnd={handleAnimationEnd} setStatus={setStatus} />
        <OrbitControls />
      </Canvas>
      <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000, padding: '10px', background: 'white', borderRadius: '5px' }}>
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>{status}</div>
        <select value={selectedAnimation} onChange={(e) => setSelectedAnimation(e.target.value)}>
          {animationList.map((anim) => (
            <option key={anim} value={anim}>{anim}</option>
          ))}
        </select>
        <button onClick={triggerAnimation} style={{ marginLeft: '10px', padding: '5px', background: 'green', color: 'white' }}>
          Activar Animación
        </button>
      </div>
    </>
  );
}
