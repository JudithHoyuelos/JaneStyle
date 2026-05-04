"use client";

import Sonido from "@/components/sonido/Sonido";
import NavBarNuevo from "@/components/NavbarNuevo/NavbarNuevo";
import BackgroundImage from "@/components/imagenFondo/BackgroundImage";
import Contact from "@/components/contacto/Contact";
import FooterLinks from "@/components/landing/FooterLinks";


function P4Contacto() {

  return (
    <>
      <BackgroundImage />
      <Contact />
      <NavBarNuevo />
      <FooterLinks />
      <Sonido />
    </>
  );
}
// Exporta el componente envuelto con un loader de progreso
export default P4Contacto;

