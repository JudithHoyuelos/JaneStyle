"use client";

import Sonido from "@/components/sonido/Sonido";
import NavbarNuevo from "@/components/NavbarNuevos/NavbarNuevo";
import BackgroundImage from "@/components/imagenFondo/BackgroundImage";
import Carousel from "@/components/proyectos/Carousel";
import PdfCarousel from "@/components/proyectos/PdfCarousel";
import VideoCarousel from "@/components/proyectos/VideoCarousel";

function P5Proyectos() {


  return (
    <>
    <BackgroundImage />
    <NavbarNuevo />
    <Carousel />
    <PdfCarousel />
    <VideoCarousel />
    {/* <Sonido />  */}
    </>
  );
}

export default P5Proyectos;
