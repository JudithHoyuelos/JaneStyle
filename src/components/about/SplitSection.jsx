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
          Hello, I introduce myself, I am Janet or Any (artistic name) and now I will explain a little about myself: I have always been interested in the arts in general and experimenting with them and that makes me think and see dierently. I really like working with concepts that impact the public and leave their mark, I am a very perfectionist so whenever I deliver something I try to make it as good as possible even if I have to put in more hours. Graphic design means that all my ideas can create life digitally and physically. The photo, however, allows me to bring pieces of the world to be able to digitize them and do from there what I see fit in each case.
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