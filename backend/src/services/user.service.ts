import User from "../models/User.js";
import { CreateUserI } from "../types/user.types.js";
import { Bcrypt } from "../utils/bcrypt.js";

export class UserService {
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
    }
}