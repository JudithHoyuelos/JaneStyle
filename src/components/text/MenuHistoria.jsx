import React from 'react';

const MenuInfo = () => {
    return (
        <>
            <ul className="lista">
                <li>
                    <a href="#contacto" onClick={() => visibilitySidebarContend()}>
                        Contacto
                    </a>
                </li>
                <li>
                    <a href="#services">Preguntas Frecuentes</a>
                </li>
                <li>
                    <a href="#about" onClick={() => setProgressValue(75)}>
                        Chatbot
                    </a>
                </li>
                <li>
                    <a href="#contact">Términos y condiciones</a>
                </li>
            </ul>
        </>
    );
}

export default MenuInfo