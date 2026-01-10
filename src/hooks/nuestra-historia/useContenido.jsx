import React, { useState } from "react";

export function useContenido() {
    const [contenido, setContenido] = useState(null);

    const contenidoCubo1 = () => (
        <div>
            <h1 className="titulo-cubo">Cubo 1</h1>
            <p className="descripcion-cubo">
                Este es el contenido personalizado para el Cubo 1.
            </p>
            <div className="extra-info">Más información sobre el Cubo 1.</div>
        </div>
    );

    const handleCuboClick = (contenidoFuncion) => {
        setContenido(() => contenidoFuncion);
    };

    const cerrarTexto = () => {
        setContenido(null);
    };

    return { contenido, contenidoCubo1, handleCuboClick, cerrarTexto };
}