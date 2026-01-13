import { asset } from '@/utils/basePath';

export const portals = [
  {
    texture: asset("/img/AccesoUsuario.png"),
    name: "Acceso de Usuario",
    url: "/login",
    modelUrl: "", // URL del modelo GLB
    modelScale: [0.005, 0.005, 0.005], // Escala del modelo
    isGlass: false,
  },
  {
    texture: asset("/img/equirectangular/sky-background-4.hdr"),
    name: "⁠Información General",
    url: "/informacion",
    modelUrl: "/models/Alvy-AI_Alvearium.glb", // URL del modelo GLB
    modelScale: [0.05, 0.05, 0.05], // Escala del modelo
    isGlass: false,
  },
  {
    texture: asset("/img/textures/cloud.png"),
    name: "Samplia World",
    url: "/",
    modelUrl: "", // URL del modelo GLB
    modelScale: [0.1, 0.1, 0.1], // Escala del modelo
    isGlass: true,
  },
  {
    texture: asset("/img/textures/cloud.png"),
    name: "⁠Uber Eats World",
    url: "/",
    modelUrl: "", // URL del modelo GLB
    modelScale: [0.1, 0.1, 0.1], // Escala del modelo
    isGlass: true,
  },
  {
    texture: asset("/img/textures/cloud.png"),
    name: "Groupon World",
    url: "/",
    modelUrl: "", // URL del modelo GLB
    modelScale: [0.1, 0.1, 0.1], // Escala del modelo
    isGlass: true,
  },
  {
    texture: asset("/img/textures/cloud.png"),
    name: "⁠Corte Inglés entradas World",
    url: "/",
    modelUrl: "", // URL del modelo GLB
    modelScale: [0.1, 0.1, 0.1], // Escala del modelo
    isGlass: true,
  },
];
