import React from 'react';

const Preguntas = () => {
    return (
        <>
            <div className="sidebar-content" style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
                <h1 className="sidebar-title" style={{ marginBottom: "20px", color: "#333" }}>
                    Preguntas Frecuentes
                </h1>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Qué es Alvearium?</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Alvearium es una plataforma digital inmersiva que combina tecnologías como la Realidad Aumentada (AR),
                        Realidad Virtual (VR), WebXR e Inteligencia Artificial (IA) para ofrecer experiencias únicas y revolucionar la
                        interacción entre lo físico y lo digital.
                    </p>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Cómo puedo registrarme en Alvearium?</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Puedes registrarte en Alvearium a través de nuestra página web completando un formulario con tus datos
                        personales, utilizando tu perfil de una red social, o vinculando tu cuenta wallet, dependiendo de las opciones
                        disponibles en tu región.
                    </p>
                </section>

                <section style={{ marginBottom: "20px" }}>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Qué es un &quot;Alvea&quot;?</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Un &quot;Alvea&quot; es tu espacio personal dentro de la plataforma Alvearium. Aquí puedes interactuar con
                        otros usuarios, compartir contenido y disfrutar de las múltiples funcionalidades que ofrece la plataforma.
                    </p>
                </section>

                <section>
                    <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Es seguro usar Alvearium?</h2>
                    <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                        Sí, Alvearium toma en serio la privacidad y seguridad de sus usuarios. Seguimos los más altos estándares en
                        protección de datos y seguridad digital para garantizar una experiencia confiable y protegida.
                    </p>
                </section>
            </div>
        </>
    );
}

export default Preguntas;