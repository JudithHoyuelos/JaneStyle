"use client";
import Sonido from "@/components/sonido/Sonido";
import NavbarNuevo from "@/components/NavbarNuevos/NavbarNuevo";
import BackgroundImage from "@/components/imagenFondo/BackgroundImage";
import withProgressLoader from "@/components/common/Loader/withProgressLoader";
import SplitSection from "@/components/about/SplitSection";


function P6SobreMi() {


  return (
    <>
    <BackgroundImage />
    <NavbarNuevo />
    <SplitSection />
    <Sonido /> 
    </>
  );
}

// export default withProgressLoader(P6SobreMi);
export default P6SobreMi;

