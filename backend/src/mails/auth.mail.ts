import { env } from "../config/env.js";
import { SendEmailDTO } from "../types/user.types.js";
import { transporter } from "../config/mail.js";
import { resend } from "../config/resend.js";
import { resetPasswordTemplate } from "./templates/reset-password.template.js";
import { verifyEmailTemplate } from "./templates/verify-email.template.js";


export const sendResetPasswordByEmail = async (data: SendEmailDTO) => {

    await transporter.sendMail({
        from: env.MAIL_FROM,
        to: data.email,
        subject: "Recuperación de contraseña - AppMedica",

        text: `
            Hola ${data.name}
            Recibimos una solicitud para cambiar tu contraseña.

            ${env.FRONTEND_URL}/reset-password/${data.token}
        `,
        html: resetPasswordTemplate(data)
    });

}

export const sendTokenVerify = async (data: SendEmailDTO) => {

    const emailOptions = {
        from: env.MAIL_FROM,
        to: data.email,
        subject: "Bienvenido - AppMedica",
        text: `
            Hola ${data.name},Gracias por usar App-medica,
            tu asistente en el recordatorio para medicamentos.
            verifica tu email en el siguiente enlace
            ${env.FRONTEND_URL}/verify-email/${data.token}`,
        html: verifyEmailTemplate(data)
    }
    await transporter.sendMail(emailOptions);
}







// Resend******

export const sendEmailByResend = async (correo: SendEmailDTO) => {
    // se puede enviar a otros correos siempre y cuando se tenga un dominio y se registre a ese dominio en resend
    const { data, error } = await resend.emails.send({
        from: "App Medica <onboarding@resend.dev>",
        to: "nassdmnstrdr@gmail.com",
        subject: "Recuperar password",
        html: `<h1>  Hola ${correo.name}</h1>
            <p>
            Recibimos una solicitud para cambiar tu contraseña.
            Puedes hacerlo desde el siguiente enlace:
            http://localhost:5173/reset-password/${correo.token}
            Si no solicitaste este cambio, ignora este correo.
            -Equipo AppMedica.
            </p>
        `,

    });
    // forma de validar errores con resend
    if (error) {
        console.error("Error sending email:", error);
        process.exit(1);
    }
    // console.log("Email sent successfully!");
    // console.log("Email ID:", data?.id);

}






