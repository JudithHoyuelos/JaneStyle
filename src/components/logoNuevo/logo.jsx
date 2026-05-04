import { useRouter } from "next/navigation";
import Link from "next/link";
import "./logo.css"
import { asset } from '@/utils/basePath';

const InicioLogoNuevo = ({  }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div
      onClick={handleClick}
      className="contenedor-logos"
      style={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: "5px",
        left: "10%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <Link href="/">
        <img
          onClick={handleClick}
          src={asset("img/logos/JANESTYLE (NEGRO).png")}
          alt="Logo"
          // style={{ width: "33rem", marginTop: "-1rem" }}
          className="logon"
        />
      </Link>
    </div>
  );
};

export default InicioLogoNuevo;
