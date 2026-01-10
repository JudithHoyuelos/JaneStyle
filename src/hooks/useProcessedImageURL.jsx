
/**
 * Custom React hook para procesar una imagen cargada desde una URL,
 * eliminando píxeles dominados por tonos rojos según un modo dado
 * ("tree" o "mountain"). Devuelve una URL de objeto con fondo procesado (transparente).
 *
 * @param {string} url - URL de la imagen a procesar.
 * @param {"tree"|"mountain"} [mode="tree"] - Modo de procesamiento: "tree" elimina fondos rojos más intensos, "mountain" detecta tonos rojos más neutros.
 * @returns {string|null} processedURL - URL de objeto (`blob:`) que apunta a la imagen procesada con fondo transparente. `null` si falla el procesamiento.
 *
 * @example
 * const processed = useProcessedImageURL("/img/arbol.png", "tree");
 */

"use client";
import { useState, useEffect } from "react";

export function useProcessedImageURL(url, mode = "tree") {
  const [processedURL, setProcessedURL] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;

    let objectURL = null;

    img.onload = () => {
      if (cancelled) return;

      const w = img.width;
      const h = img.height;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const redRatio = r / (g + b + 1);

        if (mode === "tree") {
          if (
            (r > 130 && g < 70 && b < 70 && redRatio > 1.6) ||
            (r > 120 && g < 60 && b < 60 && redRatio > 1.4) ||
            (r > 100 && g < 50 && b < 50 && redRatio > 1.2)
          ) {
            data[i + 3] = 0;
          }
        } else if (mode === "mountain") {
          const isDominantRed = redRatio > 1.4;
          const isRedStrong = r > 90 && g < 100 && b < 100;
          const isNeutralRed = Math.abs(g - b) < 40;
          const isPureDarkRed = r > 110 && g < 80 && b < 80;

          if ((isDominantRed && isRedStrong && isNeutralRed) || isPureDarkRed) {
            data[i + 3] = 0;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        if (objectURL) URL.revokeObjectURL(objectURL);
        objectURL = URL.createObjectURL(blob);
        setProcessedURL(objectURL);
      }, "image/png");
    };

    img.onerror = () => {
      if (!cancelled) {
        setProcessedURL(null);
      }
    };

    return () => {
      cancelled = true;
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
  }, [url, mode]);

  return processedURL;
}

