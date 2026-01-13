import { useRouter } from "next/navigation";
import './logo.css'; // Importa el CSS
import { asset } from '@/utils/basePath';


const InicioLogo = ({ title }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div
      onClick={handleClick}
      className="contenedor-logon"
      style={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: "20px",
        transform: "translateX(-45%)",
        zIndex: 1000,
        padding: "10px",
        cursor: "pointer",
        fontFamily: "'Sora', sans-serif", 
      }}
    >
      <img
        src={asset=("img/logos/Alvearium_logo-whitepeq.png")}
        alt="Logo"
        style={{  marginTop: "-1rem" }}
        className="logo"
      />
      {title && (
        <span
        className="tituloi"
          style={{
            marginLeft: "10px",
            color: "#fff", // Cambia el color si necesitas algo diferente
          }}
        >
          {title}
        </span>
      )}
    </div>
  );
};

export default InicioLogo;
