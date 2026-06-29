import {Schema, model } from "mongoose";
import type { User } from "../types/user.types.js";
// definimos nuestra interface para el schema de user.

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true
    },
     email: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    password: {
        required: true,
        type: String,
        trim: true
    },
    image:{
        type: String,
        default: '',
    }
});

const User = model<User>('User', userSchema);
export default User ;