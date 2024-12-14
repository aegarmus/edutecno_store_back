import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const { Pool } = pkg;

const pool = new Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});


/**
 * Realiza una consulta  la base de datos de Postgre y devuelve los datos solicitados en formato Objeto
 * @param {string} text - Consulta a realizar en la DB en formato string (Se recomienda mandar los valores parametrizados)
 * @param {Array<any>} params - Arreglo con los valores que reemplazaran los parametros en el texto de consulta
 * @returns {object} - Devuelve un Objeto con los detalles del resultado de la consulta
 */
export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();