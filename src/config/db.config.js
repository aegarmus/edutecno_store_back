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

export const query = (text, params) => pool.query(text, params);