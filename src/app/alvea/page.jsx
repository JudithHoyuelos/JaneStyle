"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import Sonido from "@/components/sonido/Sonido";
import UserProfile from "@/components/alvea/UserProfile.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import LogoutButton from "@/components/alvea/LogOut.jsx";
import { Instructions } from "@/components/alvea/Instructions.jsx";
import { VR } from "@/components/alvea/VR.jsx";
import ModalCustom from "@/components/alvea/ModalCustom/ModalCustom.jsx";
import Loader from "@/components/common/Loader/Loader.jsx";
import ButtonBurger from "@/components/common/Buttons/ButtonBurger.jsx";

const P1Alvea = dynamic(() => import("./Alvea.jsx"), {
  ssr: false,
});

export default function Page() {
  useAuth();

  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = (modalName) => {
    setVisibleModal((prev) => (prev === modalName ? null : modalName));
  };

  const quitarLoader = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <P1Alvea onModelsLoaded={quitarLoader} />
      <div className="fixed top-4 right-4 z-[60]">
        <ButtonBurger setIsVisible={setIsVisible} />
      </div>

      <div
        className={` gap-2 lg:gap-4 grid grid-cols-2 fixed top-16 right-4 lg:top-20 z-50 lg:flex lg:flex-col
  transition-opacity duration-1000 ease-in-out ${
    isVisible ? "opacity-100 visible" : "opacity-0 visible"
  }`}
      >
        <UserProfile
          isVisible={visibleModal === "UserProfile"}
          onOpen={() => handleOpen("UserProfile")}
        />
        <ModalCustom
          isVisible={visibleModal === "CustomModal"}
          onOpen={() => handleOpen("CustomModal")}
        />
        <Instructions
          isVisible={visibleModal === "Instructions"}
          onOpen={() => handleOpen("Instructions")}
        />
        <VR />
        <div className="col-span-2 justify-self-end">
        <LogoutButton  />
        </div>
      </div>

      <Sonido />
    </>
  );
}
