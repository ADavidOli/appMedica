import jwt, {JwtPayload} from "jsonwebtoken"
import { env } from "../config/env.js"; 

export const generateJWT = (payload: JwtPayload)=>{
    const token = jwt.sign(payload, env.JWT_SECRET,{
        expiresIn: '180d',
    });
    return token
}