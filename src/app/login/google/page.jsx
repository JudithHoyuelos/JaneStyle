"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { saveAccessToken } from "@/lib/auth";
import ReturnButton from "@/components/logicaP2/returnbutton";
import { envs } from "@/lib/constants";
import { ContainerCenterFullScreen, Spinner } from "@/components/GeneralComp";
import glassStyles from "@/styles/card-glass.module.css";

const GoogleAuth = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const redirectToGoogle = async () => {
    try {
      const response = await axios.get(
        `${envs.DOMAIN_URL}/auth/google/url/immersive_website/`
      );

      const googleUrl = response.data.url;
      window.location.href = googleUrl;
    } catch (error) {
      setError("Error al iniciar el flujo de autenticación.");
      setLoading(false);
    }
  };

  const fetchTokens = async (code) => {
    try {
      const response = await axios.get(
        `${envs.DOMAIN_URL}/auth/google/login/`,
        {
          params: {
            code: code,
            site: "immersive_website",
          },
        }
      );

      const { access_token, refresh_token } = response.data;

      if (access_token && refresh_token) {
        saveAccessToken(access_token);
        localStorage.setItem("refresh_token", refresh_token);
        router.push("/alvea");
      } else {
        throw new Error("Tokens no encontrados en la respuesta.");
      }
    } catch (error) {
      setError(
        "Error al obtener los tokens. Por favor, intenta nuevamente más tarde o inicia sesión utilizando tu correo electrónico y contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      redirectToGoogle();
    } else {
      fetchTokens(code);
    }
  }, [router]);

  return (
    <ContainerCenterFullScreen
      style={{
        backgroundImage: 'url("/img/pixelcut-export.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ReturnButton />
      <div className={`${glassStyles["card-glass"]} m-3`}>
        <div className="flex flex-col justify-center text-center">
          {loading ? (
            <>
              <h2 className="text-xl lg:text-2xl font-bold text-center">Redirigiendo a Google </h2>
              <div className="flex justify-center">
                <Spinner isVisible={loading} />
              </div>
            </>
          ) : error ? (
            <p className="text-red-500 font-bold text-center">{error}</p>
          ) : (
            <h2 className="text-xl lg:text-2xl font-bold text-center">Autenticación completada</h2>
          )}
        </div>
      </div>
    </ContainerCenterFullScreen>
  );
};

export default GoogleAuth;
