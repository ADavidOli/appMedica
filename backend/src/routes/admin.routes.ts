// importamos el router para nuestro routing
import { Router } from "express";
const router = Router();

// creamos nuestra rutas de admin.

router.get('/', (req, res)=>{
    res.json('funcionando');
})


export default router;