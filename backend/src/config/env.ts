import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.APP_PORT ?? '3000',
    MONGODB_URI: process.env.MONGODB_URI ?? '',
    JWT_SECRET: process.env.JWT_SECRET ?? '',
    MAIL_HOST: process.env.MAIL_HOST ?? '',
    MAIL_PORT: Number(process.env.MAIL_PORT ?? 587),
    MAIL_USER: process.env.MAIL_USER ?? '',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD ?? '',
    MAIL_FROM: process.env.MAIL_FROM ?? '',
    RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
    FRONTEND_URL: process.env.FRONTEND_URL ?? '',

};

if (!env.MONGODB_URI) {
    throw new Error('La variable MONGODB_URI no está definida');
}

if (!env.JWT_SECRET) {
    throw new Error('JWT secret no está definida aun');

}

if(!env.MAIL_HOST || !env.MAIL_PORT || !env.MAIL_USER || !env.MAIL_PASSWORD || !env.MAIL_FROM){
    throw new Error('error con las variables SMTP')
}

if(!env.RESEND_API_KEY){
    throw new Error('no se ha definido una key para resend');
}

if(!env.FRONTEND_URL){
    throw new Error('ninguna url del frontend seleccionada')
}