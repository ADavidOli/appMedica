import { Router } from "express";
import { AuthValidator } from "../validators/auth.validator.js";
import { AuthController } from "../controllers/Auth.controller.js";

const router = Router();


router.post('/register', AuthValidator.register,AuthController.create);
router.post('/login',AuthValidator.Login,AuthController.login);
router.post('/forgot-password',AuthValidator.email, AuthController.forgotpassword);
router.get('/reset-password/:token', AuthController.validateToken);
router.post('/reset-password/:token',AuthValidator.password,AuthController.resetPassword);



export default router;