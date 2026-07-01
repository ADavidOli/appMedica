// configuracion de la aplicacion con express.
import express from 'express';
import UserRouter from './routes/user.routes.js'
import AuthRouter from './routes/auth.routes.js'

const app = express();

// respuestas JSON.
app.use(express.json());

// rutas.
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);


export default app;