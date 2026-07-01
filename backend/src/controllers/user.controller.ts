import { Request, Response } from "express";
import { CreateUserI, LoginUserI } from "../types/user.types.js";
import { UserService } from "../services/user.service.js";

export class UserController {
    // controller para crear usuario
    static async create(req: Request, res: Response) {
        try {
            const body: CreateUserI = req.body;
            await UserService.createUser(body);
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
            const token = await UserService.loginUser(body);
            res.status(201).json({
                token: token,
            })
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }
    static async getUser(req: Request, res: Response) {
        try {
            return res.json(req.user);
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }
}