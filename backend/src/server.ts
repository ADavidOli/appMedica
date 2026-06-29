// aqui arrancamos el servidor
import dotenv from "dotenv";
import app from "./app.js";

// configuramos variables de entorno
dotenv.config();
const PORT = process.env.APP_PORT || 3000;

// arrancando el servidor.
async function startServer() {
    try {
        app.listen(PORT, ()=>{
            console.log(`Servidor funcionando en el puerto ${PORT}`);
        })
    } catch (error) {
        console.error("error al iniciar el serviror", error)
    }
}

startServer();
