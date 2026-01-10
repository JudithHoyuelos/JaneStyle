import React, { useState } from "react";
import styles from "./ButtonBurger.module.css";

const ButtonBurger = ({ setIsVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const toggleMenu = () => {
    if (!isClickable) return;

    setIsClickable(false);
    setTimeout(() => setIsClickable(true), 500);

    setIsOpen(!isOpen);
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      onClick={toggleMenu}
      className="bg-black lg:hover:bg-foundation-3 lg:p-2 p-1 rounded-full bg-opacity-55 cursor-pointer z-10"
    >
      <div className="p-1">
        <div className={`${styles.menuBtn} ${isOpen ? styles.open : ""}`}>
          <div className={styles.menuBtn__burger}></div>
        </div>
      </div>
    </div>
  );
};

export default ButtonBurger;
