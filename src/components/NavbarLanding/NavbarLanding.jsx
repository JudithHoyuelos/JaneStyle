import { useRouter } from "next/navigation";
import React from "react";
import './NavbarLanding.css';
import HamburgerButton from "@/components/logicaP2/hamburgesa";
import InicioLogoLanding from "@/components/logoLanding/logo";
import { useSidebarLanding } from "@/components/NavbarLanding/SidebarContextLandig";

/**
 * Es el Navbar que se usa en la landing.
 *
 * @returns {div} - El Navbar
 */
const NavBarLanding = () => {

    const router = useRouter();
    
    /**
     * Funcion con la que se puede navegar a otras paguinas
     *
     * @param {string} [path] - La ruta a donde se quiere ir
     */
    const handleNavigation = (path) => {
        router.push(path);
    };

    /** Funciones globales y estados globales del contexto */
    const {
        isSidebarCOpen,
        isSidebarhmOpen,
        closeAllSidebars,
        visibilitySidebarMenuLanding,
        moveCamera,
    } = useSidebarLanding();

    return (
        <>
            <div className='bar'>
                < InicioLogoLanding ></InicioLogoLanding>
                <HamburgerButton
                    isActive={isSidebarhmOpen || isSidebarCOpen}
                    onClick={() => {
                        if (isSidebarhmOpen || isSidebarCOpen) {
                            closeAllSidebars();
                            moveCamera(false);
                        } else {
                            visibilitySidebarMenuLanding();
                            moveCamera(true);
                        }
                    }}
                />
            </div>
        </>
    );

}

export default NavBarLanding;