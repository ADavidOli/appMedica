import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import User from "../models/User.model.js";

// middleware para saber el token mandado.
export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    // los tokens siempre se mandan en el headers
    // console.log(req.headers.authorization);

    // validamos con el beares
    const tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
        const error = new Error('no autorizado');
        return res.status(401).json({ msg: error.message });
    }
    //validamos sin el bearer
    if (!tokenBearer.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "debes loguearte primero"
        });
    }
    // separamos el token
    const token = tokenBearer.split(" ")[1];
    try {
        const decode = jwt.verify(token, env.JWT_SECRET);
        if (typeof decode === 'object' && decode.id) {
            const user = await User.findById(decode.id).select('-password -__v').lean();

            if (!user) {
                const error = new Error('El usuario no existe');
                return res.status(404).json({ msg: error.message });
            }
            req.user = user;
            next()
        }
    } catch (e) {
        const error = new Error('token no valido');
        return res.status(401).json({ msg: error.message });
    }

}