import React from "react";
import { logOut } from "@/lib/auth";
import ButtonLat from "../common/Buttons/ButtonLat";

/**
 * Componente LogoutButton
 *
 * Botón lateral que permite al usuario cerrar sesión.
 * Al hacer clic, se ejecuta la función `logOut` para finalizar la sesión.
 *
 * @component
 * @returns {JSX.Element} Botón de cierre de sesión renderizado.
 */
const LogoutButton = () => {

  const handleLogout = () => {
    logOut();
  };

  return (
    <ButtonLat
      action={handleLogout}
      imgURL="/img/icons/logout.svg"
      imgAlt="Icono de cerrar sesión"
    />
  );
};

export default LogoutButton;