import { SendEmailDTO } from "../../types/user.types.js";
import { env } from "../../config/env.js";

export const resetPasswordTemplate = (data: SendEmailDTO) => `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Recuperar contraseña</title>
</head>

<body style="
    margin:0;
    padding:0;
    background:#f3f4f6;
    font-family:Arial, Helvetica, sans-serif;
">

<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td align="center" style="padding:40px 20px;">

<table
    width="600"
    cellspacing="0"
    cellpadding="0"
    style="
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 4px 10px rgba(0,0,0,.08);
    "
>

<tr>
<td
    style="
        background:#2563EB;
        color:white;
        padding:30px;
        text-align:center;
    "
>

<h1 style="margin:0;">AppMedica</h1>
    <p style="margin-top:10px;">Recuperación de contraseña</p>
</td>
</tr>
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;">
Hola ${data.name},
</h2>

<p>
Recibimos una solicitud para cambiar la contraseña de tu cuenta.
</p>

<p>
Si fuiste tú quien realizó la solicitud, haz clic en el siguiente botón:
</p>

<div style="text-align:center;margin:40px 0;">

<a
href="${env.FRONTEND_URL}/reset-password/${data.token}"

style="
display:inline-block;
background:#2563EB;
color:white;
padding:15px 35px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
">

Cambiar contraseña

</a>

</div>

<p>
Este enlace expirará en <strong>1 hora</strong>.
</p>

<p>
Si no solicitaste este cambio, puedes ignorar este correo.
</p>

<hr style="border:none;border-top:1px solid #ddd;margin:35px 0;">

<p
style="
font-size:13px;
color:#666;
text-align:center;
"
>

© ${new Date().getFullYear()} AppMedica

</p>

</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>
`;