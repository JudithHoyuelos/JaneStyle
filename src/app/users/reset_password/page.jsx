"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReturnButton from "@/components/logicaP2/returnbutton";
import { resetPassword, validateAccound } from "@/lib/users";

/**
 * Componente ResetPassword
 *
 * Permite al usuario restablecer su contraseña usando un token obtenido desde la URL.
 * Valida la nueva contraseña (longitud mínima, números, mayúsculas, coincidencia) y
 * llama a la función de restablecimiento de contraseña.
 *
 * @component
 * @returns {JSX.Element} Formulario para restablecer la contraseña.
 */
const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const tokenFromUrl = query.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("Token no encontrado en la URL.");
    }
  }, []);

    /**
   * Maneja el envío del formulario de restablecimiento de contraseña.
   * Valida la contraseña y llama a resetPassword.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordNumberRegex = /(?=.*\d)/;
    const passwordUppercaseRegex = /(?=.*[A-Z])/;

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      console.log("Error: La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!passwordNumberRegex.test(password)) {
      setError("La contraseña debe contener al menos un número.");
      console.log("Error: La contraseña debe contener al menos un número.");
      return;
    }

    if (!passwordUppercaseRegex.test(password)) {
      setError("La contraseña debe contener al menos una letra mayúscula.");
      console.log("Error: La contraseña debe contener al menos una letra mayúscula.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      console.log("Error: Las contraseñas no coinciden.");
      return;
    }

    try {

      const isPasswordReset = await resetPassword(password, token);

      if (isPasswordReset) {
        setSuccess(true);
        setError(null);
        console.log("Contraseña restablecida exitosamente.");
        router.push("/login");
      } else {
        setError("Error al restablecer la contraseña. Por favor, intenta nuevamente.");
        console.log("Error: Error al restablecer la contraseña.");
      }
    } catch (error) {
      setError("Error al intentar restablecer la contraseña. Por favor, intenta nuevamente.");
      console.log("Error al intentar restablecer la contraseña:", error);
    }
  };

  return (
    <div
      className="center-container"
      style={{
        backgroundImage: 'url("/img/pixelcut-export.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ReturnButton />
      {success ? (
        <p className="success-message">Contraseña restablecida exitosamente.</p>
      ) : (
        <form className="glass-card p-3" onSubmit={handleSubmit}>
          <h2 className="heading-2">Restablecer contraseña</h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button type="submit" className="login-button bg-foundation-1">
            Restablecer Contraseña
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;