"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, saveAccessToken, signInWithToken } from "@/lib/auth";
import useAuth from "@/hooks/useAuth";
import ReturnButton from "@/components/logicaP2/returnbutton";
import { envs } from "@/lib/constants";
import glassStyles from "@/styles/card-glass.module.css";
import inputStyles from "@/styles/input-rounded.module.css";
import {
  ContainerCenterFullScreen,
  Divider,
  Spinner,
} from "@/components/GeneralComp";

function Auth() {
  useAuth("/alvea", null);

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetStatus, setResetStatus] = useState("");
  const toggleResetPassword = () => {
    setIsResetPassword(!isResetPassword);
    setError("");
    setResetStatus("");
  };

  useEffect(() => {
    async function tryLogIn() {
      const urlParams = new URLSearchParams(window.location.search);
      const uid = urlParams.get("uid");
      const token = urlParams.get("token");

      if (!uid || !token) return;
      try {
        const { access_token } = await signInWithToken(uid, token);

        saveAccessToken(access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        router.push("/alvea");
      } catch (e) {
        router.push("/login");
      }
    }
    tryLogIn();
  });

  const toFormData = (data) => {
    const formData = new URLSearchParams();
    for (let key in data) {
      if (data[key]) formData.append(key, data[key]);
    }
    return formData;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      await axios.get(
        `${envs.DOMAIN_URL}/users/reset-password/?email=${encodeURIComponent(
          email
        )}`
      );
      setResetStatus("Correo de recuperación enviado con éxito.");
    } catch (error) {
      setResetStatus(
        error.response?.data?.detail ||
          "Error al enviar el correo de recuperación."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      const jwt = await signIn(email, password);

      if (!jwt) {
        setError("Credenciales inválidas. Por favor intente de nuevo.");
        return;
      }

      saveAccessToken(jwt);

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      router.push("/alvea");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Fallo en el inicio de sesión. Por favor intente de nuevo."
      );
      console.error("Error en el inicio de sesión:", error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    router.push("/login/google");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordNumberRegex = /(?=.*\d)/;
    const passwordUppercaseRegex = /(?=.*[A-Z])/;

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!passwordNumberRegex.test(password)) {
      setError("La contraseña debe contener al menos un número.");
      return;
    }

    if (!passwordUppercaseRegex.test(password)) {
      setError("La contraseña debe contener al menos una letra mayúscula.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await axios.post(
        `${envs.DOMAIN_URL}/auth/register/`,
        toFormData({ email, password, firstname, lastname }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setIsLogin(true);
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Fallo en el inicio de sesión. Por favor intente de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <ContainerCenterFullScreen
      style={{
        backgroundImage: 'url("/img/pixelcut-export.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ReturnButton />
      {isResetPassword ? (
        <form
          onSubmit={handleResetPassword}
          className={`${glassStyles["card-glass"]} m-3`}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-center">
            Restablecer contraseña
          </h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyles["input-rounded"]}
            required
          />
          <div className="flex justify-center items-center h-full">
            {resetStatus && (
              <p className="text-red-500 font-bold">{resetStatus}</p>
            )}
            <Spinner isVisible={isLoading} />
          </div>
          <button
            type="submit"
            className=" w-full text-white p-2 lg:p-3 rounded-full bg-foundation-1"
          >
            Enviar correo de recuperación
          </button>
          <div className="flex justify-center">
            <p
              onClick={toggleResetPassword}
              className="underline cursor-pointer"
            >
              Volver
            </p>
          </div>
        </form>
      ) : isLogin ? (
        <form
          onSubmit={handleLogin}
          className={`${glassStyles["card-glass"]} m-3`}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-center">Iniciar sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyles["input-rounded"]}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyles["input-rounded"]}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              <p>
              {showPassword ? "Ocultar" : "Mostrar"}
              </p>
            </button>
          </div>
          <div className="flex justify-center items-center h-full">
            {error && <p className="text-red-500 font-bold">{error}</p>}
            <Spinner isVisible={isLoading} />
          </div>

          <button
            type="submit"
            className=" w-full text-white p-2 lg:p-3 rounded-full bg-foundation-1"
          >
            Iniciar sesión
          </button>
          <div className="flex justify-center space-x-6">
            <p onClick={toggleForm} className="text-center underline cursor-pointer">
              ¿No tienes cuenta?
            </p>
            <p
              onClick={toggleResetPassword}
              className="text-center underline cursor-pointer"
            >
              ¿Has olvidado la contraseña?
            </p>
          </div>

          <Divider />

          <div className="text-center">
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="w-full text-black p-3 rounded-full border border-black flex items-center justify-center gap-2"
            >
              <img
                src="/img/logos/google_logo.png"
                alt="Logo de Google"
                className="w-6 h-6"
              />
              Continuar con Google
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleRegister}
          className={`${glassStyles["card-glass"]} m-3`}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-center">Registrarse</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className={inputStyles["input-rounded"]}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className={inputStyles["input-rounded"]}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyles["input-rounded"]}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyles["input-rounded"]}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              <p>
              {showPassword ? "Ocultar" : "Mostrar"}
              </p>
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputStyles["input-rounded"]}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <p>
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </p>
            </button>
          </div>
          <div className="flex justify-center items-center h-full">
            {error && <p className="text-red-500 font-bold">{error}</p>}
            <Spinner isVisible={isLoading} />
          </div>
          <button
            type="submit"
            className=" w-full text-white p-3 rounded-full bg-foundation-1"
          >
            <span>
            Registrarse
            </span>
          </button>
          <div className="flex justify-center space-x-6">
            <p
              onClick={toggleForm}
              className="text-center underline cursor-pointer"
            >
              ¿Ya tienes una cuenta?
            </p>
            <p
              onClick={toggleResetPassword}
              className="text-center underline cursor-pointer"
            >
              ¿Has olvidado la contraseña?
            </p>
          </div>

          <Divider />
          <div className="text-center">
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="w-full text-black p-3 rounded-full border border-black flex items-center justify-center gap-2"
            >
              <img
                src="/img/logos/google_logo.png"
                alt="Logo de Google"
                className="w-6 h-6"
              />
              Continuar con Google
            </button>
          </div>
        </form>
      )}
    </ContainerCenterFullScreen>
  );
}

export default Auth;
