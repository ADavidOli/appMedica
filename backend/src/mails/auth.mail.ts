import { env } from "../config/env.js";
import { SendResetPasswordDTO } from "../types/user.types.js";
import { transporter } from "../config/mail.js";


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