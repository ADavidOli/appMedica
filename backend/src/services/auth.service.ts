import User from "../models/User.model.js";
import { CreateUserI, EmailDto, LoginUserI } from "../types/user.types.js";
import { Bcrypt } from "../utils/bcrypt.js";
import { generateJWT } from "../utils/jwt.js";
import crypto from "crypto";

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
        // guardamos el usuario.
        await user.save();
        return user;
    };


    // logica para login
    static async loginUser(data:LoginUserI){
        const user = await User.findOne({email: data.email});
        if(!user){
            throw new Error("Cuenta no registrada");
        }
        // comprobando nuestro password
        const passwordCorrect = await Bcrypt.check(data.password, user.password);
        if(!passwordCorrect){
            throw new Error("password incorrecto");
        }
        const token = generateJWT({id: user.id});
        return token;

    }

    static async sendToken(data:EmailDto){
        const {email} = data;
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Correo no registrado en el sistema')
        }
        // generamos el token
        const token = crypto.randomBytes(32).toString("hex");
        // generamos la expiracion.
        const expires = new Date();
        expires.setHours(expires.getHours()+1);
        user.token = token;
        user.tokenExpiresAt = expires;

        // guardamos.
        user.save();
    }
}