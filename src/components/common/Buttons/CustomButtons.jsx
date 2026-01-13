import React, { useState, useEffect } from 'react';
import './CustomButtons.css';
import { asset } from '@/utils/basePath';

const CustomButtons = ({ onLeftClick, onRightClick, isMenuOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button
        onClick={onLeftClick}
        aria-label="Flecha izquierda"
        className={`custom-button left-button ${isMenuOpen ? 'hidden' : ''}`}
      >
        <img
          href={asset("img/icons/arrow-sm-left-svgrepo-com.svg")}
          alt="Flecha izquierda"
          className="button-icon"
        />
      </button>

      <button
        onClick={onRightClick}
        aria-label="Flecha derecha"
        className={`custom-button right-button ${isMenuOpen ? 'hidden' : ''}`}
      >
        <img
          href={asset("img/icons/arrow-sm-right-svgrepo-com.svg")}
          alt="Flecha derecha"
          className="button-icon"
        />
      </button>
    </>
  );
};

export default CustomButtons;
