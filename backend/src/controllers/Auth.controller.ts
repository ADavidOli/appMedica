import type { Response } from "express";
import { CreateUserI, EmailDto, LoginUserI, passwordDto, tokenDto } from "../types/user.types.js";
import { AuthService } from "../services/auth.service.js";
import { Body, Params, Req } from "../types/reques.types.js";

export class AuthController {
    // controller para crear usuario
    static async create(req: Body<CreateUserI>, res: Response) {
        try {
            const { name, email, password } = req.body;
            await AuthService.createUser({ name, email, password });
            res.status(201).json({
                msg: "usuario creado correctamente",
            });
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })

        }
    };
    static async login(req: Body<LoginUserI>, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await AuthService.loginUser({ email, password });
            res.status(202).json({
                token: token,
            })
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }

    // tipar los request
    // Request<{Params}, {ResBody}, {ReqBody}, {Query}> express ocupa este orden para tipar
    //  Query<T> = Request<{}, {}, {}, T>;
    static async forgotpassword(req: Body<EmailDto>, res: Response) {
        try {
            const { email } = req.body;
            await AuthService.sendToken({ email });
            res.status(202).json({
                msg: "enviamos un correo de recuperacion"
            })
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }

    static async validateToken(req: Params<tokenDto>, res: Response) {
        try {
            const {token} = req.params;
            await AuthService.validateToken({token});
            res.status(202).json({
                msg: "token valido"
            })
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            });
        }
    }

    static async resetPassword(req:Req<tokenDto,passwordDto>, res: Response) {
        try {
            const {token} = req.params;
            const {password} = req.body;
            await AuthService.resetPassword({token}, {password});
            res.status(202).json({
                msg:"contraseña cambiada correctamente"
            })
        } catch (error) {
            return res.status(409).json({
                msg: error instanceof Error ? error.message : "Error interno"
            })
        }
    }

}