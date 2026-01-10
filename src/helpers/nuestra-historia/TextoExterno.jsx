import React from "react";

/**
 * Es un boton que hay en nuestra historia para cerrar contenidos.
 * Se queria poner el contenido renderizado y despues el boton para cerrarlo, todo
 * en uno.
 *
 * @export
 * @param {{ visible: any; renderContenido: any; onClose: any; }} param0
 * @param {boolean} [visible] - Estado para ver si es visible o no
 * @param {Function} [renderContenido] - Funcion para renderizar el contenido
 * @param {Function} [onClose] - Funcion para cerrar
 * @returns {div} - Boton para cerrar 
 */
export function TextoExterno({ visible, renderContenido, onClose }) {
    if (!visible || !renderContenido) return null;

    return (
        <div className="texto-externo">
            {renderContenido()}
            <button className="cerrar-boton" onClick={onClose}>
                X
            </button>
        </div>
    );
}