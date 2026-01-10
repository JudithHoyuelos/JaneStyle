"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { envs } from "@/lib/constants";

/**
 * Componente Portal
 * Representa un bloque clicable que actúa como enlace a otra sección.
 * Cambia de tamaño según el ancho de la ventana.
 *
 * @param {Object} props
 * @param {string} props.title - Título a mostrar en el portal.
 * @param {Function} props.onClick - Función que se ejecuta al hacer clic en el portal.
 * @returns {JSX.Element}
 */
function Portal({ title, onClick }) {
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);

      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const styleLg = { height: '40rem' }
    return (
        <div
            style={windowSize.width > 1024? styleLg: {}}
            className="bg-violet-800 flex flex-row items-center justify-center cursor-pointer hover:bg-violet-500 lg:w-1/3 h-80 w-3/4"
            onClick={onClick}
        >
            <p>{ title }</p>
        </div>
    )
}

/**
 * Componente Bienvenida
 * Pantalla inicial que ofrece dos opciones al usuario:
 * - Acceder al sitio inmersivo (con Next.js)
 * - Acceder a la WebApp clásica
 *
 * Redirige automáticamente a la WebApp si se accede desde un móvil.
 * Extrae los parámetros `uid` y `token` de la URL si existen.
 *
 * @returns {JSX.Element}
 */
function Bienvenida() {
    const [uid, setUid] = useState(null);
    const [token, setToken] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (window.innerWidth < 768)
            location.replace(envs.WEBAPP_URL);

        const params = new URLSearchParams(location.search);

        const _uid = params.get('uid');
        const _token = params.get('token')
        if (!_uid || !_token) return;

        setUid(_uid);
        setToken(_token);
    }, [uid, token]);

      /**
   * Maneja el clic sobre "Immersive WebSite".
   * Redirige a la página de login, pasando los parámetros `uid` y `token` si existen.
   *
   * @param {React.MouseEvent} e
   */
    const handleImmersiveWebsiteClick = (e) => {
        e.preventDefault();

        let query_params = new URLSearchParams({ uid, token });
        if (!uid || !token) query_params = '';

        router.push('/login?' + query_params);
    }

      /**
   * Maneja el clic sobre "WebApp".
   * Redirige directamente a la URL definida en `envs.WEBAPP_URL`.
   *
   * @param {React.MouseEvent} e
   */
    const handleWebAppClick = (e) => {
        e.preventDefault();

        location.replace(envs.WEBAPP_URL)
    }

    return (
        <div className="bg-gray-800 flex lg:flex-row flex-col items-center justify-around w-full min-h-screen">
            <Portal title="Immersive WebSite" onClick={handleImmersiveWebsiteClick} />
            <Portal title="WebApp" onClick={handleWebAppClick} />
        </div>
    )
}

export default Bienvenida;