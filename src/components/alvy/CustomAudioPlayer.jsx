import React, { useRef, useState, useEffect, useMemo } from "react";

/**
 * @componente CustomAudioPlayer
 * @descripcion Reproductor de audio personalizado con barra de progreso e iconos de reproducción/pausa.
 *
 * @param {{
 *   src: string,                 
 *   calculatedDuration?: number   
 * }} props
 */
const CustomAudioPlayer = ({ src, calculatedDuration }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /**
   * Actualiza la duración del audio y maneja el evento de finalización.
   */
  useEffect(() => {
    const audio = audioRef.current;
    let animationFrameId;

    const updateProgress = () => {
      setCurrentTime((prevTime) => prevTime + (audio.currentTime - prevTime) * 0.1);

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    const updateDuration = () => {
      if (!calculatedDuration) {
        setDuration(audio.duration || 0);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      cancelAnimationFrame(animationFrameId);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(animationFrameId);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isPlaying, calculatedDuration]);

  /**
  * Si se proporciona una duración calculada válida, se utiliza.
  */
  useEffect(() => {
    if (calculatedDuration && isFinite(calculatedDuration)) {
      setDuration(calculatedDuration);
    } else {
      setDuration(0);
    }
  }, [calculatedDuration]);


  /**
   * Alterna entre reproducir y pausar el audio.
   */
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  /**
 * Permite avanzar o retroceder el audio desde la barra de progreso.
 */
  const handleSeek = (e) => {
    const newTime = (e.target.value * duration) / 100;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const playPauseIcon = useMemo(
    () => (isPlaying ? "/img/icons/pause.svg" : "/img/icons/play.svg"),
    [isPlaying]
  );

  const progressPercentage = (currentTime / duration) * 100 || 0;

  return (
    <div className="flex items-center w-full">
      <button className="mr-2" onClick={togglePlayPause}>
        <div className="w-4 h-4 lg:w-6 lg:h-6">
          <img src={playPauseIcon} alt="Play/Pause" />
        </div>
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={progressPercentage}
        onChange={handleSeek}
        className="flex-grow appearance-none h-1 bg-white rounded-lg cursor-pointer accent-purple-600"
        style={{ flexBasis: "50%" }}
      />

      <span className="mx-2 text-xs text-gray-500">
        {formatTime(currentTime)}/{formatTime(duration)}
      </span>

      <audio ref={audioRef} src={src} />
    </div>
  );
};

const formatTime = (time) => {
  if (!isFinite(time) || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default CustomAudioPlayer;