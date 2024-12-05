import { 
    createAddressTable, 
    createProductTable, 
    createSalesProductsTable, 
    createSalesTable, 
    createUserTable 
} from "../utils/db/createDbTables.js";

import { connectDb } from '../utils/db/connectDB.js'


export const initializeDB = async() => {
    try {
        await createUserTable();
        await createAddressTable();
        await createProductTable();
        await createSalesTable();
        await createSalesProductsTable();

        console.log('Tablas cargadas con éxito!');

        const { now } = await connectDb();
        console.log(`Conexión éxitosa a PostgreSQL realizada el ${now}`);

    } catch (error) {
        console.error('Error al inicializar la base de datos en PostgreSQL');
    }
};