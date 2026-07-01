import dotenv from "dotenv";
dotenv.config();

export const env ={
    PORT: process.env.APP_PORT ?? '3000',
    MONGODB_URI: process.env.MONGODB_URI ?? '',
    JWT_SECRET: process.env.JWT_SECRET ?? '',
};

if(!env.MONGODB_URI){
    throw new Error('La variable MONGODB_URI no está definida');
}

if(!env.JWT_SECRET){
    throw new Error('JWT secret no está definida aun');
    
}
