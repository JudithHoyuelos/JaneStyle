import { useRouter } from "next/navigation";
import "./logo.css"

const InicioLogoLanding = ({  }) => {
  const router = useRouter();

  return (
    <div
      className="contenedor-logo"
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
        src="/img/logos/JANESTYLE (NEGRO).png"
        alt="Logo"
        // style={{ width: "33rem", marginTop: "-1rem" }}
        className="logol"
      />
    </div>
  );
};

export default InicioLogoLanding;
