"use client";

import { useEffect, useState } from "react";
import "./VideoCarousel.css";
import { videoFiles } from "./videoFiles";

const VideoCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videoFiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const openVideo = (id) => {
    window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");
  };

  return (
    <div className="video-wrapper">

      <div className="video-track">

        {videoFiles.map((video, i) => {
          const isActive = i === index;

          return (
            <div
              key={i}
              className={`video-card ${isActive ? "active" : ""}`}
              onClick={() => openVideo(video.id)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
              />
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default VideoCarousel;