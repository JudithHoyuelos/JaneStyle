import { asset } from "@/utils/basePath";
import "./SplitSection.css";

const SplitSection = () => {
  return (
    <section className="split-container">

      {/* IZQUIERDA */}
      <div className="split-left">
        <img
          src={asset("img/pixelcut-export.jpeg")}
          alt="izquierda"
        />
      </div>

      {/* DERECHA */}
      <div className="split-right">

        <div className="split-text">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quibusdam itaque fugit ipsa deleniti suscipit quaerat ducimus temporibus accusantium delectus, maxime iure molestias dicta reprehenderit nihil exercitationem esse incidunt consequuntur!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem debitis quod quos ab optio magni suscipit quas laborum, facere, iste dolorem aliquam, deleniti reprehenderit doloribus voluptates ut sed tempora harum.
          </p>
        </div>

        <div className="split-bottom-image">
          <img
            src={asset("img/FONDO NUBES.png")}
            alt="horizontal"
          />
        </div>

      </div>

    </section>
  );
};

export default SplitSection;