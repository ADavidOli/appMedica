// configuracion de la aplicacion con express.
import express from 'express';

const app = express();

// respuestas JSON.
app.use(express.json());

// rutas.
app.get("/", (req, res)=>{
    res.json({
        msg: "api funcionando"
    })
})


export default app;