import { Types } from "mongoose";
import User from "../models/User.model.js";
import { PasswordDto, UpdateUser } from "../types/user.types.js";
import { Bcrypt } from "../utils/bcrypt.js";

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
    static async updatePassword(data:PasswordDto, userId: Types.ObjectId){
        const {password, newPassword} = data;
        const user = await User.findById(userId);

        const isPassword = await Bcrypt.check(password, user.password);
        if(!isPassword){
            throw new Error('El password colocado no es el correcto');
        }

        const isSame = await Bcrypt.check(newPassword, user.password);
        if(isSame){
            throw new Error('La nueva contraseña debe ser diferente a la actual');
        }

        user.password = await Bcrypt.hash(newPassword);
        await user.save();
    }

}