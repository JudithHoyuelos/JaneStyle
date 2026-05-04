import { useRouter } from "next/navigation";
import React from "react";
import './NavbarNuevo.css';
import Menu from "../menu/Menu";
import InicioLogoNuevo from "@/components/logoNuevo/logo";

/**
 * Es el Navbar que se usa en la landing.
 *
 * @returns {div} - El Navbar
 */
const NavbarNuevo = () => {

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
            <div className='bar'>
                < InicioLogoNuevo ></InicioLogoNuevo>
                <Menu></Menu>
            </div>
        </>
    );

}

export default NavbarNuevo;