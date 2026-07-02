import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { PasswordDto, UpdateUser } from "../types/user.types.js";
import { Types } from "mongoose";
import { Body } from "../types/reques.types.js";

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
    static async updateUser(req: Body<UpdateUser> , res: Response) {
        try {
            const {name, email} = req.body;
            const userId: Types.ObjectId = req.user._id;
            const user = await UserService.updateProfile({name, email}, userId);
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

    static async updatePassword(req:Body<PasswordDto>, res: Response) {
        try {
            const {password, newPassword} = req.body;
            const userId: Types.ObjectId = req.user._id;
            await UserService.updatePassword({password, newPassword}, userId);
            res.status(200).json({
                msg: "password modificado correctamente"
            })
            
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }
}