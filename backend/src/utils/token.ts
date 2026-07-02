import crypto from "crypto";


export const generateToken = ()=>{
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    return{
        token, 
        expires
    }
}