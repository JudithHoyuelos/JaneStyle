"use client";

import "aframe";
import "aframe-extras";
import "@/helpers/alvea/followCamera";
import "@/helpers/alvea/lookAt";
import "@/helpers/alvea/hdr";

import React, { useEffect } from "react";

function Palacio({ onModelsLoaded }) {


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
          rotation="0 180 0"
          >
        <a-entity
          id="Alvea"
          gltf-model="/models/Palacio.glb"
          position="10.3 0 7.9"
          scale="1 1 1"
        ></a-entity>
        </a-entity>


      </a-scene>
    </>
  );
}

export default Palacio;
