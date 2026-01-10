import React from 'react';

const ChatbotInfo = () => {
    return (
        <>
            <ul className="listan">
                <li><h1>AlvyAI</h1></li>
                <div className="sidebar-content" style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
                    <h1 className="sidebar-title" style={{ marginBottom: "20px", color: "#333" }}>
                        Cómo usar Alvy AI
                    </h1>

                    <section style={{ marginBottom: "20px" }}>
                        <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Qué es Alvy AI?</h2>
                        <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                            Alvy AI es una avanzada inteligencia artificial diseñada para interactuar de manera natural y proporcionar
                            soluciones personalizadas. Ya sea que necesites información, asistencia técnica o ideas creativas, Alvy está
                            aquí para ayudarte.
                        </p>
                    </section>

                    <section style={{ marginBottom: "20px" }}>
                        <h2 style={{ fontSize: "1.4rem", marginBottom: "10px", color: "#444" }}>¿Cómo inicio una conversación con Alvy AI?</h2>
                        <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                            Para comenzar, simplemente clique encima del alvy que se encuentra a la izquierda de la alvea, acepta darle permisos al micrófono y hablale.
                            Alvy analizará tu mensaje y responderá de manera precisa y eficiente.
                        </p>
                    </section>

                    <section style={{ marginBottom: "20px" }}>
                        <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Qué hacer si no recibo una respuesta?</h2>
                        <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                            Si no recibes una respuesta inmediata, verifica tu conexión a internet y asegúrate de que Alvy esté conectado.
                            Si el problema persiste, intenta recargar la página o cerrar y volver a abrir la conexión.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ marginBottom: "10px", color: "#444" }}>¿Es seguro interactuar con Alvy AI?</h2>
                        <p style={{ lineHeight: "1.6", textAlign: "justify", color: "#555" }}>
                            Sí, Alvy AI cumple con altos estándares de privacidad y seguridad. Tus datos e interacciones están protegidos y
                            no se comparten con terceros sin tu consentimiento.
                        </p>
                    </section>
                </div>
            </ul>
        </>
    );
}

export default ChatbotInfo;