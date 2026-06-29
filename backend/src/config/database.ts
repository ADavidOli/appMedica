import mongoose from "mongoose";
import { env } from "./env.js";

export async function conectDB() {
    try {
        const uri = env.MONGODB_URI;
        if(!uri){
            throw new Error('MONGODB_URI no está definida');
        }

        const conexion = await mongoose.connect(uri);
        console.log(`MongoDB conectado en ${conexion.connection.host} con el puerto ${conexion.connection.port}`);

    } catch (error) {
        console.error(`no se pudo conectar a la base de datos`, error)
        process.exit(1);
    }
    
}