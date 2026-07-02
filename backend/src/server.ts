// aqui arrancamos el servidor
import { env } from "./config/env.js";
import app from "./app.js";
import { conectDB } from "./config/database.js";
import { verifyMailConnection } from "./config/mail.js";

// arrancando el servidor.
async function startServer() {
    try {
        // conectamos con nuestro cluster de base de datos.
        await conectDB();
        await verifyMailConnection();
        app.listen(env.PORT, ()=>{
            console.log(`Servidor funcionando en el puerto ${env.PORT}`);
        })
    } catch (error) {
        console.error("error al iniciar el serviror", error)
    }
}

startServer();
