"use client";

import {
  CustomCanvas,
  ModelLoader,
  OceanComponent,
  SkyComponent,
} from "@/components/SceneComp";
import Sonido from "@/components/sonido/Sonido";
import InicioLogo from "@/components/logo/logo";
import ReturnButton from "@/components/logicaP2/returnbutton";
import withProgressLoader from "@/components/common/Loader/withProgressLoader";
import Chatbot from "@/components/alvy/Chatbot";


function P6Contenido() {


  return (
    <>

       <CustomCanvas>
        <SkyComponent />
        <OceanComponent />
        {/* <ModelLoader url="/models/Alvea_Alvearium.glb" /> */}
      </CustomCanvas>

       <Sonido /> 
      <InicioLogo />
      <ReturnButton />
      <Chatbot showCanvas={true} />
    </>
  );
}

export default withProgressLoader(P6Contenido);
// export default P6Contenido;

