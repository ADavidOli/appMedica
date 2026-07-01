import { Request, Response } from "express";
import { CreateUserI, LoginUserI } from "../types/user.types.js";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
    // controller para crear usuario
    static async create(req: Request, res: Response) {
        try {
            const body: CreateUserI = req.body;
            await AuthService.createUser(body);
            res.status(201).json({
                msg: "usuario creado correctamente",
            });
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })

        }
    };
    static async login(req: Request, res: Response) {
        try {
            const body: LoginUserI = req.body;
            const token = await AuthService.loginUser(body);
            res.status(201).json({
                token: token,
            })
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }
   
}