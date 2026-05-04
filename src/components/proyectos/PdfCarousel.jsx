import { useEffect, useState } from "react";
import "./PdfCarousel.css";
import { pdfFiles } from "./pdfFiles";

const PdfCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % pdfFiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const openPdf = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="pdf-wrapper">

      <div className="pdf-track">

        {pdfFiles.map((pdf, i) => {
          const isActive = i === index;

          return (
            <div
              key={i}
              className={`pdf-card ${isActive ? "active" : ""}`}
              onClick={() => openPdf(pdf.file)}
            >

              <div className="pdf-icon">
                📄
              </div>

              <p>{pdf.name}</p>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default PdfCarousel;