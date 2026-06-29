import mongoose, {Schema, model } from "mongoose";

// definimos nuestra interface para el schema de user.
export interface IUser {
    name: string;
    email: string;
    password: string;
    image: string;
};


const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        tirm: true
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

const User = mongoose.model<IUser>('User', userSchema);
export default User ;