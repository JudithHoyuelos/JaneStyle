import React from "react";
import { circulosData } from "@/helpers/nuestra-historia/circulosData";
import "./ContenidoHistoria.css"

/**
 * Recibe el id del sidebar donde se va a mostrar y el circulo selecionado.
 * Filtra los sidebars y despues los pone en columnas, finalmente
 * muestra mapea la informacion y la muestra dependiendo del circulo
 * que se haya seleccionado. 
 *
 * @param {{ setSelectedCircle: any; sidebarId: any; }} param0
 * @param {number} [param0.setSelectedCircle] - Numero del circulo seleccionado
 * @param {number} [param0.sidebarId] - Numero del sidebar donde se muestra
 * @returns {div}
 */
const ContenidoHistoria = ({ setSelectedCircle, sidebarId }) => {
    // Filtrar por sidebarId actual
    const circulosFiltrados = circulosData.filter(c => c.sidebarId === sidebarId);

    // Agrupar por fila gracias al nuemro de filas
    const filasUnicas = [...new Set(circulosFiltrados.map(c => c.fila))];
    const filas = filasUnicas.map(fila =>
        circulosFiltrados.filter(c => c.fila === fila)
    );

    return (
        <>
            <div className="flex flex-col items-center w-full h-full justify-center gap-20 contenedor-general ">
                {filas.map((fila, i) => (
                    <div key={i} className="flex justify-center w-full gap-20 contenedor-filas">
                        {fila.map((circle) => (
                            <div key={circle.id} className="flex flex-col items-center contenedor-contenido">
                                <div className="rounded-full border border-white p-1 bg-transparent">
                                    <div
                                        className={`w-32 h-32 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 bg-center bg-cover imagen ${!circle.image ? circle.color : ''}`}
                                        style={{
                                            backgroundImage: circle.image ? `url(${circle.image})` : "none",
                                        }}
                                        onClick={() => setSelectedCircle(circle)}
                                    ></div>
                                </div>
                                {/* Version como esta en el figma siendo mas o menos responsive */}
                                <h3 className="text-xl font-bold text-white mt-2 justify-center items-center text-center w-48 break-words leading-tight">{circle.title}</h3>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ContenidoHistoria