import { Request, Response } from "express";
import { CreateUserI } from "../types/user.types.js";
import { UserService } from "../services/user.service.js";
import { error } from "node:console";

export class UserController {
    // controller para crear usuario
    static async create(req: Request, res: Response) {
        try {
            const body: CreateUserI = req.body;
            const user = await UserService.createUser(body);
            res.status(201).json(user);
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })

        }
    }
}