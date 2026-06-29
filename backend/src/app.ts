// configuracion de la aplicacion con express.
import express from 'express';
import UserRouter from './routes/user.routes.js'
import AdminRouter from './routes/admin.routes.js'

const app = express();

// respuestas JSON.
app.use(express.json());

// rutas.
app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);


export default app;