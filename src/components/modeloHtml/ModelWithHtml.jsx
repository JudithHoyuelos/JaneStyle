import React from 'react';
import { Html } from "@react-three/drei";
import "./ModelWithHtml.css"

/**
 * Son los circulos que aparecen en informcion, aqui se controla los parametros
 * que se pasan para que funcionen y se posicionen donde se debe.
 *
 * @param {{ position: any; cameraPosition: any; cameraRotation: any; htmlOffset: any; onClick: any; hoverMessage: any; }} param0
 * @param {Vector3} [param0.position] - El vestor3 de donde estan colocados
 * @param {Vector3} [param0.cameraPosition] - La posicion de donde tiene que moverse la camara
 * @param {Vector3} [param0.cameraRotation] - Si la camara tiene que rotar 
 * @param {Vector3} [param0.htmlOffset] - Para posicionar la camara detras del modelo
 * @param {Function} [param0.onClick]  - La funcion para acercarse cuando se hace click y abrir el modal
 * @param {string} [param0.hoverMessage] - El nombre del contenido
 * @returns {Object} - Los HTML que son los circulos en informacion
 */

const ModelWithHtml = ({
    position,
    cameraPosition,
    cameraRotation,
    htmlOffset,
    onClick,
    hoverMessage, // Mensaje personalizado
}) => {
    /** Funcion que se usa para comprobar si los parametros estan y pasarselos al onclick y ejecutarlos */
    const handleClick = () => {
        if (onClick && cameraPosition && cameraRotation) {
            onClick(cameraPosition, cameraRotation, htmlOffset);
        }
    };

    return (
        <group position={position}>
            <Html center position={[0, 1, 0]}>
                <div
                    onClick={handleClick}
                    className="clickable-circle-container"
                >
                    <div className="outer-circle"></div>
                    <div className="middle-circle"></div>
                    <div className="inner-circle"></div>
                    {/* Mensaje siempre visible */}
                    <p className="hover">
                        {hoverMessage}
                    </p>
                </div>
            </Html>
        </group>
    );
};

export default ModelWithHtml;