"use client";

import { useEffect, useState } from "react";
import "./Carousel.css";
import { carouselImages } from "./carouselImages";

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-wrapper">

      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${index * 30}%)`,
        }}
      >

        {carouselImages.map((img, i) => {
          const isActive = i === index;

          return (
            <div
              key={i}
              className={`carousel-card ${isActive ? "active" : ""}`}
            >
              <img src={img} alt={`slide-${i}`} />
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Carousel;