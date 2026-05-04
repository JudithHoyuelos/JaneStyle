import nodemailer from "nodemailer";

export async function POST(req) {
  const { nombre, email, asunto, mensaje } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: asunto,
    text: `
Nombre: ${nombre}
Email: ${email}
Mensaje: ${mensaje}
    `,
  });

  return Response.json({ success: true });
}