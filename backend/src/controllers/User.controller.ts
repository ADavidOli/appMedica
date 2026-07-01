import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { UpdateUser } from "../types/user.types.js";
import { Types } from "mongoose";

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
    static async updateUser(req: Request, res: Response) {
        try {
            const body : UpdateUser = req.body;
            const userId : Types.ObjectId = req.user._id;
            const user = await UserService.updateProfile(body, userId);
            res.status(200).json({
                msg: "usuario actualizado correctamente",
                user
            })
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }
}