// importamos el router para nuestro routing
import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthValidator } from "../validators/auth.validator.js";

const router = Router();

// creamos nuestra rutas de admin.

router.post('/auth/register', AuthValidator.register, UserController.create);

export default router;