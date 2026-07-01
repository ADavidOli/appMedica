import { Router } from "express";
import { AuthValidator } from "../validators/auth.validator.js";
import { AuthController } from "../controllers/Auth.controller.js";

const router = Router();


router.post('/register', AuthValidator.register,AuthController.create);
router.post('/login',AuthValidator.Login,AuthController.login);



export default router;