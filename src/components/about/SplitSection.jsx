import { asset } from "@/utils/basePath";
import "./SplitSection.css";

const SplitSection = () => {
  return (
    <section className="split-container">

      {/* IZQUIERDA */}
      <div className="split-left">
        <img
          src={asset("img/CA6924A8-2CDB-4D58-86BA-9F66E70AC841.png")}
          alt="izquierda"
        />
      </div>

      {/* DERECHA */}
      <div className="split-right">

        <div className="split-text">
          <p>
          Hello, I introduce myself, I am Janet and now I will explain a little about myself: I have always been interested in the arts in general and experimenting with them and that makes me think and see differently. I really like working with concepts that impact the public and leave their mark, I am very perfectionist so whenever I deliver something I try to make it as good as possible even if I have to put in more hours. Graphic design means that all my ideas can create life digitally and physically. The photo, however, allows me to bring pieces of the world to be able to digitize them and do from there what I see fit in each case. Video, on the other hand, allows me to tell stories through movement and emotion, creating experiences that connect more deeply with the audience.
          </p>
        </div>

        <div className="split-bottom-image">
          <img
            src={asset("img/PATRON (negro).png")}
            alt="horizontal"
          />
        </div>

      </div>

    </section>
  );
};

export default SplitSection;