import { sendResetPasswordByEmail, sendTokenVerify } from "../mails/auth.mail.js";
import User from "../models/User.model.js";
import { CreateUserI, EmailDto, LoginUserI, passwordDto, tokenDto } from "../types/user.types.js";
import { Bcrypt } from "../utils/bcrypt.js";
import { generateJWT } from "../utils/jwt.js";
import { generateToken } from "../utils/token.js";

export class AuthService {
    // logica para crear usuario
    static async createUser(data: CreateUserI) {
        const userExist = await User.exists({ email: data.email });
        // validamos si no existe
        if (userExist) {
            throw new Error("El correo ya está registrado");
        }
        // obtenemos el usuario desde el data
        const user = new User(data);
        // hasheamos la contraseña;
        user.password = await Bcrypt.hash(data.password);

        // generamos el token.
        const { token, expires } = generateToken();
        user.token = token
        user.tokenExpiresAt = expires;

        // guardamos el usuario.
        await user.save();

        // mandamos el correo
        await sendTokenVerify({
            name: user.name,
            email: user.email,
            token: user.token
        });

        return user;
    };

    static async validateEmail(data: tokenDto) {
        const user = await this.validateToken(data);
        user.token = "";
        user.tokenExpiresAt = null;
        user.confirmed = true;
        await user.save();
    }


    // logica para login
    static async loginUser(data: LoginUserI) {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error("Cuenta no registrada");
        }
        if (!user.confirmed) {
            throw new Error('Cuenta no confirmada por el token')
        }

        // comprobando nuestro password
        const passwordCorrect = await Bcrypt.check(data.password, user.password);
        if (!passwordCorrect) {
            throw new Error("password incorrecto");
        }
        const token = generateJWT({ id: user.id });
        return token;

    }

    static async sendToken(data: EmailDto) {
        const { email } = data;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Correo no registrado en el sistema')
        }
        // generamos el token
        const { token, expires } = generateToken();
        user.token = token
        user.tokenExpiresAt = expires;
       

        // guardamos.
        await user.save();
        // forma de enviar correos via google.smtp, los servidores gratuitos configurar con las iplist
        await sendResetPasswordByEmail({
            name: user.name,
            email: user.email,
            token: user.token
        });

        // enviar via resend->solo configurar con un dominio propio desde resend
        // await sendEmailByResend({
        //     name: user.name,
        //     email: user.email,
        //     token: user.token
        // });
    }

    static async validateToken(data: tokenDto) {
        const { token } = data
        const user = await User.findOne({ token });
        if (!user) {
            throw new Error('token no valido');
        };

        // validamos la expiracion.
        const now = new Date();
        const expires = new Date(user.tokenExpiresAt);

        if (now >= expires) {
            throw new Error('token ya expirado');
        };
        return user;
    }

    static async resetPassword(token: tokenDto, data: passwordDto) {
        const { password } = data;
        const user = await this.validateToken(token);
        user.password = await Bcrypt.hash(password);
        user.token = "";
        user.tokenExpiresAt = null;

        await user.save();
    }


}