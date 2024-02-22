import env from "../config.js";
import nodemailer from "nodemailer";
// const nodemailer = async () => {
//   return await import("nodemailer");
// };

const sendMail = async ({ to, subject, html, text = "" }) => {
  const email = { to, subject, html, text, from: env.MAILTRAP_EMAIL };
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: env.MAILTRAP_EMAIL,
      pass: env.MAILTRAP_PASSWORD,
    },
  });

  await transport.sendMail(email);
};

export default sendMail;
