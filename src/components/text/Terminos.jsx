import React from 'react';

const Terminos = () => {
    return (
        <>
            <div className="sidebar-content" style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
                <h1 className="sidebar-title" style={{ marginBottom: "20px", color: "#333" }}>
                    Términos y Condiciones de Uso
                </h1>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>Condiciones de servicio</h2>
                    <h3 style={{ fontSize: "1rem", fontWeight: "normal", color: "#555" }}>
                        Última actualización: 02/12/2024
                    </h3>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>Su relación con nosotros</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Bienvenido a Alvearium. Alvearium es una página web (la «Página») a través de la que se crea un ecosistema
                        digital inmersivo que revoluciona la manera en que las personas interactúan con su entorno, al integrar
                        tecnologías de vanguardia como la Realidad Aumentada (AR), Realidad Virtual (VR), WebXR, Inteligencia Artificial
                        (IA). Este ecosistema brinda a los usuarios la oportunidad de experimentar actividades cotidianas y eventos
                        especiales desde una perspectiva completamente nueva, al combinar lo físico con lo digital.
                    </p>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>Limitaciones de los Servicios</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Nosotros nos esforzamos por ofrecer los Servicios sin interrupciones significativas y por mejorar los Servicios
                        continuamente. No obstante, puede suceder que el servicio no esté disponible en parte o en su totalidad, durante
                        determinados periodos de tiempo o de forma permanente, por motivos de inactividad planificada o no planificada,
                        por razones de mantenimiento o en caso de dificultades técnicas.
                    </p>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>Aceptación de las Condiciones</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Al inscribirse, al acceder a los Servicios o al utilizarlos, usted declara que puede celebrar y que celebra un
                        acuerdo jurídicamente vinculante con Alvearium consistente en las Condiciones, que usted tiene 18 años de edad o
                        más y que usted acepta las Condiciones y se compromete a cumplirlas.
                    </p>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>Propiedad intelectual</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Nosotros respetamos los derechos de propiedad intelectual y usted también debe hacer lo mismo. Usted sólo podrá
                        subir y utilizar contenido sobre el que tenga todos los derechos, licencias, permisos y autorizaciones que le
                        permitan hacerlo y, en general, que le permitan utilizar el contenido de conformidad con las Condiciones.
                    </p>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Alguna pregunta?</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Póngase en contacto con nosotros a través del formulario disponible en la Página.
                    </p>
                    <p style={{ marginTop: "10px" }}>
                        <a
                            href="https://alvearium.io/term-and-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#007bff", textDecoration: "underline" }}
                        >
                            https://alvearium.io/term-and-conditions
                        </a>
                    </p>
                    <p style={{ marginTop: "5px" }}>
                        <a
                            href="https://alvearium.io/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#007bff", textDecoration: "underline" }}
                        >
                            https://alvearium.io/privacy-policy
                        </a>
                    </p>
                </section>
            </div>
        </>
    );

}

export default Terminos;