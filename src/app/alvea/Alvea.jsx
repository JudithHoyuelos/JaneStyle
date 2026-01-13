"use client";

import "aframe";
import "aframe-extras";
import "@/helpers/alvea/followCamera";
import "@/helpers/alvea/lookAt";
import "@/helpers/alvea/hdr";

import React, { useEffect, useState, useCallback } from "react";
import * as alvy from "@/lib/alvy";
import { asset } from '@/utils/basePath';

import useAudioRecorder from "@/hooks/useAudioRecorder";

function P1Alvea({ onModelsLoaded }) {
  const { isRecording, onRecordStart } = useAudioRecorder();
  const [isClicked, setIsClicked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isInteractionDisabled, setIsInteractionDisabled] = useState(false);

  const checkAndReconnect = useCallback(async () => {
    if (!alvy.isConnected()) {
      try {
        await alvy.startConnection();
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    } else {
      setIsConnected(true);
    }
  }, []);

  useEffect(() => {
    const alvyImg = document.querySelector("#AlvyImg");

    if (!alvyImg) return;

    if (isRecording) {
      setIsInteractionDisabled(true);
      alvyImg.setAttribute("src", asset("img/icons/microphone.svg"));
      alvyImg.removeAttribute("animation__2");
      alvyImg.setAttribute("rotation", "0 0 0");
    } else if (
      !isRecording &&
      alvyImg.getAttribute("src") === asset("img/icons/microphone.svg")
    ) {
      alvyImg.setAttribute("src", asset("img/icons/loading.svg"));
      alvyImg.setAttribute(
        "animation__2",
        "property: rotation; to: 0 0 360; dur: 1000; loop: true; easing: linear;"
      );
    }
  }, [isRecording]);

  useEffect(() => {
    alvy.onResponse((message) => {
      const alvyImg = document.querySelector("#AlvyImg");

      if (!alvyImg) return;

      if (message.command === "audio" && message.message) {
        const audioElement = new Audio(URL.createObjectURL(message.message));
        setIsClicked(true);

        alvyImg.setAttribute("rotation", "0 0 0");
        alvyImg.removeAttribute("animation__2");
        alvyImg.setAttribute("src", asset("img/icons/sound.svg"));

        audioElement.play().catch((error) => { });

        audioElement.onended = () => {
          setIsClicked(false);
          setIsInteractionDisabled(false);
          alvyImg.setAttribute("src", asset("img/icons/click.svg"));
        };
      } else {
        alvyImg.setAttribute("rotation", "0 0 0");
        alvyImg.removeAttribute("animation__2");
        alvyImg.setAttribute("src", asset("img/icons/click.svg"));
        setIsInteractionDisabled(false);
      }
    });

    checkAndReconnect();

    return () => {
      alvy.closeConnection();
    };
  }, [checkAndReconnect]);

  const handleClick = async () => {
    if (isClicked || isInteractionDisabled) return;

    setIsTextVisible(false);
    setIsInteractionDisabled(true);

    await checkAndReconnect();

    if (isConnected) {
      onRecordStart();
    } else {
      setIsInteractionDisabled(false);
    }
  };

  useEffect(() => {
    const entity = document.getElementById("Alvea");

    const handleModelLoaded = () => {
      onModelsLoaded();
    };

    if (entity) {
      entity.addEventListener("model-loaded", handleModelLoaded);
    } else {
      console.error("No se encontró la entidad con el ID: Alvea");
    }

    return () => {
      if (entity) {
        entity.removeEventListener("model-loaded", handleModelLoaded);
      }
    };
  }, []);

  return (
    <>
      <a-scene
        hdri-environment="path: /img/equirectangular/rogland_clear_night_4k.hdr"
        id="iframe-id"
        loading-screen="enabled: false;"
      >
        <a-light
          id="main-light"
          color="#bf9b9b"
          type="ambient"
          intensity="1"
        ></a-light>
        <a-light
          color="#bf9b9b"
          type="point"
          intensity="1"
          position="0 10 -9"
        ></a-light>
        <a-entity
          id="rig"
          position="0 0 0"
          movement-controls="controls: gamepad,keyboard,nipple; constrainToNavMesh: true"
          nipple-controls="mode: static; lookJoystickEnabled: false; moveJoystickEnabled:true; moveJoystickPosition: right"
        >
          <a-entity id="player" position="0 1.6 0" camera look-controls />
          <a-entity
            raycaster="objects: [data-raycastable]; interval: 500"
            cursor="rayOrigin: mouse"
          ></a-entity>
        </a-entity>
        <a-entity
          id="Alvea"
          gltf-model="/models/Alvea_Alvearium.glb"
          position="0 0 -9"
          scale="1 1 1"
        ></a-entity>
        <a-entity>
          <a-entity
            id="Alvy"
            gltf-model={asset("/models/Alvy-AI_Alvearium.glb")}
            data-raycastable
            followcamera
            look-at="#player"
            animation-mixer="clip: Idle_Anim_Anim_0;"
            rotation="0 -90 0"
            position="0 1 -15"
            scale=".15 .15 .15"
            onClick={handleClick}
          >
            {isTextVisible && (
              <a-text
                position="0 6 0"
                align="center"
                scale="2 2 2"
                width="6"
                letter-spacing="2"
                value="Pulsa aqui, preguntame y te respondo"
              ></a-text>
            )}
            <a-image
              id="AlvyImg"
              src={asset("img/icons/click.svg")}
              animation="property: position; to: 0 4 0; dur: 2000; easing: linear; loop: true; dir: alternate"
              position="0 4.5 0"
              scale="1 1 1"
            ></a-image>
          </a-entity>
        </a-entity>
        <a-image
          id="profileImg"
          responsive-size="maxSize: 2"
          width="2"
          height="2"
          position="-10.9 2.25 -9"
          rotation="0 90 0"
          src={asset("img/profile-picture.svg")}
        ></a-image>
        <a-entity
          id="Navmesh"
          gltf-model="/models/navmesh-circle.gltf"
          nav-mesh
          position="0 .1 -9"
          scale="20 .1 22"
          visible="false"
        ></a-entity>
      </a-scene>
    </>
  );
}

export default P1Alvea;