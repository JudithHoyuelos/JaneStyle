import { useAnimations, useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export function Robot({ action, onLoadComplete }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const group = useRef();
  const { nodes, animations } = useGLTF("/models/Alvy-AI_Alvearium.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (nodes && animations) {
      setIsLoaded(true);
    }
  }, [nodes, animations]);

  useEffect(() => {
    if (actions?.Idle_Anim_Anim_0) {
      actions.Idle_Anim_Anim_0.play();
    }
  }, [actions]);

  useEffect(() => {
    if (isLoaded && onLoadComplete) {
      onLoadComplete(isLoaded);
    }
  }, [isLoaded, onLoadComplete]);

  return (
    <group ref={group} position={[0, -5, -6]}>
      <primitive scale={3} onClick={action} object={nodes.Scene} />
    </group>
  );
};

export function RobotAnim({ action, onLoadComplete, injectAnimation }) {
  const { scene, animations } = useGLTF('/models/Alvy AI2.glb');
  const { actions, mixer } = useAnimations(animations, scene);
  const { loaded } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationList = ["2", "3", "5", "4", "2", "8", "5", "6 v2"];
  const [currentAction, setCurrentAction] = useState(null);
  const [injectedAnimation, setInjectedAnimation] = useState(null);
  const [loadCompleteTriggered, setLoadCompleteTriggered] = useState(false);
  const group = useRef();

  useEffect(() => {
    if (loaded && onLoadComplete && !loadCompleteTriggered) {
      onLoadComplete(true);
      setLoadCompleteTriggered(true);
    }
  }, [loaded, onLoadComplete, loadCompleteTriggered]);

  useEffect(() => {
    if (actions) {
      let animationName = injectedAnimation || animationList[currentIndex];
      const newAction = actions[animationName];
      const fadeDuration = 0.2;

      if (!newAction) return;

      if (currentAction) {
        currentAction.crossFadeTo(newAction, fadeDuration, false);
      }

      newAction.reset().fadeIn(fadeDuration).play();
      newAction.clampWhenFinished = true;
      newAction.loop = THREE.LoopOnce;
      setCurrentAction(newAction);

      const onFinished = () => {
        if (injectedAnimation) {
          setInjectedAnimation(null);
        } else {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % animationList.length);
        }
      };

      mixer.addEventListener("finished", onFinished);
      return () => {
        mixer.removeEventListener("finished", onFinished);
      };
    }
  }, [actions, currentIndex, injectedAnimation, mixer]);

  useEffect(() => {
    if (injectAnimation) {
      setInjectedAnimation(injectAnimation);
    }
  }, [injectAnimation]);

  return (
    <group ref={group} position={[0, -4, -6]}>
      <primitive scale={10} onClick={action} object={scene} />
    </group>
  );
}