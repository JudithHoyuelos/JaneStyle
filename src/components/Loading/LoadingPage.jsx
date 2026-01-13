// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import styles from './LoadingPage.module.css';

// const LoadingPage = ({ percentage }) => {
//   const [clipPath, setClipPath] = useState('polygon(0 100%, 100% 100%, 100% 100%, 0 100%)');

//   useEffect(() => {
//     const newClipPath = `polygon(0 ${100 - percentage}%, 100% ${100 - percentage}%, 100% 100%, 0 100%)`;
//     setClipPath(newClipPath);
//   }, [percentage]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.logoContainer}>
//         <Image src="/img/Property 1=logo purple.svg" alt="Logo" width={200} height={200} className={styles.logoWhite} />
//         <div className={styles.logoColor} style={{ clipPath: clipPath }}>
//           <Image src="/img/Property 1=Variant2.svg" alt="Logo" width={200} height={200} />
//         </div>
//       </div>
//       <div className={styles.loader}>{percentage}%</div>
//     </div>
//   );
// };

// export default LoadingPage;

import React from "react";
import Image from "next/image";
import styles from "./LoadingPage.module.css";
import { asset } from '@/utils/basePath';

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div className="logoContainer"></div>
      <div className={styles.logoContainer}>
        <Image src={asset("img/logos/Property 1=logo purple.svg")} alt="Logo" width={200} height={200} className={styles.logoWhite} />
        <Image src={asset("img/logos/Property 1=Variant2.svg")} alt="Logo" width={200} height={200} className={styles.logoColor} />
        <div className={styles.waveOverlay}></div>
      </div>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingPage;
