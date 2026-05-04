import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Mensaje enviado ✔");
  };

  return (
    <div className="contact-wrapper">

      {/* IZQUIERDA - FORM */}
      <form className="contact-form" onSubmit={handleSubmit}>

        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

        <input name="asunto" placeholder="Asunto" onChange={handleChange} required />

        <textarea name="mensaje" placeholder="Mensaje" onChange={handleChange} required />

        <button type="submit">Enviar</button>

      </form>

      {/* DERECHA - INFO */}
      <div className="contact-info">

        <div className="info-block">
            <h2>Contacto</h2>
            <p>
              Si prefieres en vez de rellenar el formulario para enviar el email, también puedes contactarme directamente por teléfono o email.
            </p>
        </div>

        <div className="info-block">
          <h3>📞 Teléfono</h3>
          <a href="tel:+34600123456">+34 600 123 456</a>
        </div>

        <div className="info-block">
          <h3>📧 Email</h3>
          <a href="mailto:contacto@tudominio.com">Email</a>
        </div>

        <div className="info-block">
          <h3>🕒 Horario</h3>
          <p>Lunes - Viernes: 9:00 - 18:00</p>
        </div>

      </div>

    </div>
  );
};

export default Contact;