import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
    // controller para crear usuario
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