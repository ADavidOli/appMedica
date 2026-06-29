import User from "../models/User.js";
import { CreateUserI } from "../types/user.types.js";

export class UserService {
    // logica para crear usuario
    static async createUser(data: CreateUserI) {
        const userExist = await User.findOne({ email: data.email });
        if (userExist) {
           throw new Error("El correo ya está registrado"); 
        }
        const user = await User.create(data);
        return user;
    }
}