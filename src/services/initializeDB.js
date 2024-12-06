import { TableDb } from "../utils/db/createDbTables.js";

import { connectDb } from '../utils/db/connectDB.js'
import { createTableQueries } from "../utils/constants/createTablesQueries.js";
import { DataBaseError } from "../errors/TypesError.js";


export const initializeDB = async() => {
    try {
        for (const query of createTableQueries) {
            await TableDb.create(query)
        }

        console.log('Tablas cargadas con éxito!');

        const { now } = await connectDb();
        console.log(`Conexión éxitosa a PostgreSQL realizada el ${now}`);

    } catch (error) {
        throw new DataBaseError('Error al inicializar la base de datos en PostgreSQL', error);
    }
};