// importamos el router para nuestro routing
import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

// creamos nuestra rutas de admin.

router.post('/auth/register', AuthValidator.register, UserController.create);
router.post('/auth/login',AuthValidator.Login, UserController.login);
router.get('/profile',authenticate,UserController.getUser);

export default router;