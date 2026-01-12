import { useRouter } from "next/navigation";
import React from "react";

/**
 * Es el menu interactivo que hay en la paguina de la landing.
 *
 * @returns {div} - Informacion para el menu 
 */
const MenuLanding = () => {

    const router = useRouter();

    /**
     * Funcion con la que se puede navegar a otras paguinas
     *
     * @param {string} [path] - La ruta a donde se quiere ir
     */
    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <>
            <ul className="lista">
                <li>
                    <button onClick={() => handleNavigation("/login")}>
                      Biografia
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation("/informacion")}>
                       Proyectos
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation("/")}>
                        Contacto
                    </button>
                </li>
                {/* <li>
                    <button onClick={() => handleNavigation("/")}>
                        Uber Eats World
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation("/")}>
                        Groupon World
                    </button>
                </li>
                <li>
                    <button onClick={() => handleNavigation("/")}>
                        ⁠Corte Inglés entradas World
                    </button>
                </li> */}
            </ul>
        </>
    );
}

export default MenuLanding;