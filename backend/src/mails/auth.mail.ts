import { env } from "../config/env.js";
import { SendResetPasswordDTO } from "../types/user.types.js";
import { transporter } from "../config/mail.js";
import { resend } from "../config/resend.js";


export const sendResetPasswordByEmail = async (data: SendResetPasswordDTO) => {
    // primero creamos el objeto.
    const emailOptions = {
        from: env.MAIL_FROM,
        to: data.email,
        subject: "Recuperacion de la contraseña - AppMedica",
        text: `
            Hola ${data.name},

            Recibimos una solicitud para cambiar tu contraseña.

            Puedes hacerlo desde el siguiente enlace:

            http://localhost:5173/reset-password/${data.token}

            Si no solicitaste este cambio, ignora este correo.

            -Equipo AppMedica.
            `,
    };
    // mandamos el email con las opciones creadas en el objeto es await
    await transporter.sendMail(emailOptions);
}

export const sendEmailByResend = async (correo: SendResetPasswordDTO) => {
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






