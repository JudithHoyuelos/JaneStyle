"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader/Loader.jsx";
import { VR } from "@/components/alvea/VR.jsx";

const Palacio = dynamic(() => import("./Palacio.jsx"), {
  ssr: false,
});

export default function ExpPalacio() {
  const [loading, setLoading] = useState(true);

  const quitarLoader = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <Palacio onModelsLoaded={quitarLoader} />
      <div
        className={` fixed top-8 right-8  

    
  `}
      >
        <VR />
      </div>
    </>
  );
}
