import { getClient } from "../../config/db.config.js"
import { DataBaseError } from "../../errors/TypesError.js";



export const beginTransaction = async(client) => {
    try {
        await client.query('BEGIN');
        return client;
    } catch (error) {
        client.release();
        throw new DataBaseError(`Error al iniciar la transacción`, error)
    }
};


export const commitTransaction = async(client) => {
    try {
        await client.query('COMMIT');
        console.log('Commit realizado con éxito');
    } catch (error) {
        throw new DataBaseError(`Error al confirmar la transacción`, error);
    } finally {
        client.release();

    }

}


export const rollbackTransaction = async(client) => {
    try {
        await client.query('ROLLBACK');
        console.log('Volviendo al punto de guardado más cercano')
    } catch (error) {
        throw new DataBaseError('Error al revertir la transacción', error);
    } finally {
        client.release()
    }
}

