import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/lib/auth";
import { envs } from "@/lib/constants";
import glassStyles from "@/styles/card-glass.module.css";
import inputStyles from "@/styles/input-rounded.module.css";
import ButtonLat from "../common/Buttons/ButtonLat";
import ButtonClose from "../common/Buttons/ButtonClose";
import { ContainerCenter } from "../GeneralComp";


/**
 * Componente UserProfile
 * 
 * Muestra la información del usuario autenticado.
 * Incluye botón para abrir/cerrar la vista del perfil.
 * Obtiene los datos del usuario desde la API protegida usando un token JWT.
 * 
 * @param {Object} props
 * @param {boolean} props.isVisible - Controla la visibilidad del perfil.
 * @param {function} props.onOpen - Función para alternar la visibilidad.
 * @returns {JSX.Element} Componente con información del usuario y controles.
 */
const UserProfile = ({ isVisible, onOpen }) => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwt = getAccessToken();

        if (!jwt) {
          throw new Error(
            "Access token no encontrado. Por favor, inicia sesión."
          );
        }

        const response = await axios.get(`${envs.DOMAIN_URL}/users/me/`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const { firstname, lastname, email } = response.data;
        setUserData({ firstname, lastname, email });
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          error.response?.data?.detail ||
            "Error al obtener los datos del usuario. Por favor, inténtelo más tarde."
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <ButtonLat
        action={onOpen}
        imgURL="/img/icons/profile.svg"
        imgAlt="Icono de usuario"
      />

      {isVisible && (
        <ContainerCenter>
          <div className={`${glassStyles["card-glass"]} mb-10 mt-10 text-center flex flex-col`}>
            <ButtonClose action={onOpen} />
            <h2 className="text-xl lg:text-2xl font-bold text-center">
              Información del Usuario
            </h2>
            <p>Nombre:</p>
            <p className={`${inputStyles["input-rounded"]} justify-center`}>
              {userData.firstname || "No disponible"}
            </p>
            <p>Apellidos:</p>
            <p className={`${inputStyles["input-rounded"]} justify-center`}>
              {userData.lastname || "No disponible"}
            </p>
            <p>Email:</p>
            <p className={`${inputStyles["input-rounded"]} justify-center`}>
              {userData.email || "No disponible"}
            </p>
            {errorMessage && (
              <p className="text-red-500 font-bold">{errorMessage}</p>
            )}
          </div>
        </ContainerCenter>
      )}
    </>
  );
};

export default UserProfile;