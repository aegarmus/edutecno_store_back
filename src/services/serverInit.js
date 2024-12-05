import { initializeDB } from "./initializeDB.js";

export const serverInit = async(app, port) => {
    try {
        console.log('Verificando conexión con PostgreSQL');
        await initializeDB();
        
        app.listen(port, () => {
            console.log(`Servidor andando en el puerto: ${port} 👽`);
        });
    } catch (error) {
        console.error(error.message);
    }
}