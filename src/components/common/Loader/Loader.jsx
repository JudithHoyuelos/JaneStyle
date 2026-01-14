import React from "react";
import Image from "next/image";
import styles from "./Loader.module.css";
import { asset } from '@/utils/basePath';


const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        {/* <Image
          // src={asset("img/logos/Property 1=logo JANESTYLE (BLANCO).png")}
          // src={asset("img/logos/JANESTYLE (BLANCO).png")}
          alt="Logo"
          width={200}
          height={200}
          className={styles.logoWhite}
        /> */}
        {/* <Image
          // src={asset("img/logos/Property 1=logo JANESTYLE (NEGRO).png")}
          // src={asset("img/logos/JANESTYLE (NEGRO).png")}
          alt="Logo"
          width={200}
          height={200}
          className={styles.logoColor}
        /> */}
        <div className={styles.waveOverlay}></div>
      </div>
    </div>
  );
};

export default Loader;
