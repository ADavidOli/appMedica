// importamos el router para nuestro routing
import { Router } from "express";
import { UserController } from "../controllers/User.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

// creamos nuestra rutas de admin.


router.get('/profile',authenticate,UserController.getUser);

export default router;