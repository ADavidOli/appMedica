import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false,
    // service: "gmail",
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD
    }
});

export const verifyMailConnection = async() =>{
    try {
        await transporter.verify();
        console.log('smtp listo para enviar correos')
    } catch (error) {
         console.error(`no se pudo conectar el SMTP`, error)
    }
}