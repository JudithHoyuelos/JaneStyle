import React from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src="/img/logos/Property 1=logo purple.svg"
          alt="Logo"
          width={200}
          height={200}
          className={styles.logoWhite}
        />
        <Image
          src="/img/logos/Property 1=Variant2.svg"
          alt="Logo"
          width={200}
          height={200}
          className={styles.logoColor}
        />
        <div className={styles.waveOverlay}></div>
      </div>
    </div>
  );
};

export default Loader;
