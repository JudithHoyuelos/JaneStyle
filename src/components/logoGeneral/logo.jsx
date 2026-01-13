import { useRouter } from "next/navigation";
import './logo.css'
import { asset } from '@/utils/basePath';

const InicioLogoGeneral = ({  }) => {
  const router = useRouter();

  return (
    <div
      className="contenedor-logogeneral"
      style={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: "5px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <img
        src={asset("img/logos/Alvearium_logo-white_optimized - copia.png")}
        alt="Logo"
        // style={{ width: "33rem", marginTop: "-1rem" }}
        className="logol"
      />
    </div>
  );
};

export default InicioLogoGeneral;
