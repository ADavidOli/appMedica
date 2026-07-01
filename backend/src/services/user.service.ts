import { Types } from "mongoose";
import User from "../models/User.model.js";
import { UpdateUser } from "../types/user.types.js";

export class UserService {
    static async updateProfile(data: UpdateUser, userId: Types.ObjectId) {
        const { name, email } = data;
        // verificamos si existe el email y lo comparamos con el Id de nuestro req.
        const ExistingUser = await User.findOne({ email }).select('email');
        if (ExistingUser && !ExistingUser._id.equals(userId)) {
            throw new Error('El correo ya existe, intenta con otro')
        }

        // creamos nuestro usuario. para modificar su perfil
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        // asignamos los valores del data al usuario.
        user.name = name;
        user.email = email;
        await user.save();
        return user;
    }

}