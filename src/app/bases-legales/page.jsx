import React from "react";
import Image from "next/image";

export default function BasesLegales() {
  return (
    <div className="m-7">
      <div className="logo max-w-screen-sm">
        <Image
          src="/img/logos/Alv_ColorPNG.png"
          alt="Logo"
          width={500} // Ajusta según el ancho deseado
          height={300} // Ajusta según la altura deseada
          className="logo w-full h-full"
          style={{ filter: "invert(100%)" }}
        />
      </div>
      <div className="prose">
        <h1>BASES LEGALES DEL SORTEO: “VIAJE A CANARIAS PARA 2 PERSONAS”</h1>
        <h2>1.- Compañía organizadora</h2>
        <p>
          La presente promoción es organizada por Alvearium VR SL, con C.I.F.
          B09678129 y domicilio social en Calle Uribitarte 6, 48001 Bilbao, con
          el objetivo de promocionar sus servicios y presencia en redes
          sociales.
        </p>
        <h2>2.- Requisitos de los participantes</h2>
        <p>
          Podrán participar personas físicas mayores de 18 años, residentes
          legales en España, con cuenta activa en Instagram. La participación es
          personal e intransferible. Queda excluida la participación a través de
          representantes o terceros, así como el personal de la entidad
          organizadora y sus familiares hasta el segundo grado.
        </p>
        <h2>3.- Mecánica del sorteo</h2>
        <p>
          Para participar, los interesados deberán cumplir los siguientes
          requisitos:
        </p>
        <h2>4.- Premios</h2>
        <h3>
          Premio principal: Dos viajes para dos personas a Canarias, que
          incluye:
        </h3>

        <p>
          • Billetes de ida y vuelta desde cualquier aeropuerto en territorio
          peninsular español.
        </p>

        <p>• Estancia de 3 noches en hotel con desayuno incluido.</p>

        <p>
          • Fechas sujetas a disponibilidad y exclusión de periodos de alta
          demanda.
        </p>

        <p>Premios extra: 50 packs de 20 eur en créditos Groupon.</p>
        <p>
          El premio es personal e intransferible, no puede ser canjeado por
          dinero ni por ningún otro producto o servicio.
        </p>
        <h2>Condiciones a cumplir para participar:</h2>
        <h3>Premio Principal:</h3>
        <p>1. Seguir la cuenta oficial de Instagram @alvearium_</p>
        <p>
          2. Mencionar a un mínimo de 3 amigos en los comentarios de la
          publicación del sorteo (cuantos más comentarios, más posibilidades de
          ganar)
        </p>
        <p>
          3. Compartir el Reel del sorteo en sus historias de Instagram
          mencionando a @alvearium_
        </p>
        <h2>Premios extra:</h2>

        <p>
          1. Registrarse en la webapp de Alvearium mediante el enlace en la
          biografía de @alvearium_ proporcionando un correo electrónico válido
          al que se comunicará el premio
        </p>
        <h2>5.- Ámbito geográfico y duración</h2>
        <p>
          La promoción es válida para residentes legales en España y estará
          activa desde el 20 de diciembre de 2024 hasta el 15 de enero de 2025.
        </p>
        <h2>6.- Selección de ganadores</h2>
        <p>
          Los ganadores serán seleccionados de forma aleatoria mediante
          herramientas digitales tras verificar el cumplimiento de los
          requisitos. El sorteo se realizará el 15 de enero de 2025.
        </p>
        <p>• Se seleccionará un ganador y dos suplentes para cada premio.</p>
        <p>
          • En caso de que no se pueda contactar al ganador en un plazo de 48
          horas, se contactará al suplente.
        </p>
        <h2>7.- Comunicación y entrega del premio</h2>
        <p>
          El ganador será contactado a través de mensaje directo en Instagram o
          mediante el correo electrónico registrado en la webapp, según el caso.
          Para reclamar el premio, deberá proporcionar los datos necesarios en
          un plazo máximo de 48 horas.
        </p>
        <h2>8.- Protección de datos</h2>
        <p>
          Los datos recabados serán tratados conforme al Reglamento (UE)
          2016/679 (Reglamento General de Protección de Datos) y la Ley Orgánica
          3/2018, de Protección de Datos y Garantía de los Derechos Digitales.
        </p>
        <h2>9.- Reservas y limitaciones</h2>
        <p>
          La entidad organizadora se reserva el derecho de excluir del sorteo a
          los participantes que no cumplan con los requisitos, hagan un uso
          indebido del mismo o participen de manera fraudulenta.
        </p>
        <h2>10.- Aceptación de las bases</h2>
        <p>
          La participación en este sorteo implica la aceptación íntegra de las
          presentes bases legales.
        </p>
        <h2>11.- Legislación aplicable</h2>
        <p>
          Este sorteo se rige por la legislación española. Para cualquier
          controversia, serán competentes los juzgados y tribunales de Madrid.
        </p>
        <h2>12.- Exoneración Instagram</h2>
        <p>
          Instagram está completamente exonerada de toda responsabilidad por
          parte de cada concursante o participante.
        </p>
        <p>
          La promoción no está patrocinada, avalada ni organizada por Instagram,
          ni asociada en modo alguno a esta plataforma.
        </p>
      </div>
    </div>
  );
}
