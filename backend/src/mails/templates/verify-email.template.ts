import { SendEmailDTO } from "../../types/user.types.js";
import { env } from "../../config/env.js";

export const verifyEmailTemplate = (data: SendEmailDTO) => `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Validacion de correo</title>
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
        background:#22C55E;
        color:white;
        padding:30px;
        text-align:center;
    "
>

<h1 style="margin:0;">AppMedica</h1>
    <p style="margin-top:10px;">Validacion de Correo electronico</p>
</td>
</tr>
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;">
Hola ${data.name},
</h2>

<p>
    Ya falta poco para que uses AppMedica. tu ayuda para recordar tus medicamentos en orden
</p>

<p>
Si fuiste tú quien realizó la solicitud, haz clic en el siguiente botón:
</p>

<div style="text-align:center;margin:40px 0;">

<a
href="${env.FRONTEND_URL}/verify-email/${data.token}"

style="
display:inline-block;
background:#22C55E;
color:white;
padding:15px 35px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
">

    Verificar Correo electronico

</a>

</div>

<p>
Este enlace expirará en <strong>1 hora</strong>.
</p>

<p>
Si no creaste tu la cuenta, puedes ignorar este correo.
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