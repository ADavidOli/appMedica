// importamos el router para nuestro routing
import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
const router = Router();

// creamos nuestra rutas de admin.

router.post('/auth/register', UserController.create);


export default router;