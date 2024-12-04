import { query } from "../../config/db.config.js";

export const createUserTable = async() => {
    try {
        const queryCreate = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id UUID PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                apellido_paterno VARCHAR(255) NOT NULL,
                apellido_materno VARCHAR(255),
                email VARCHAR(100) NOT NULL UNIQUE,
                telefono VARCHAR(12) NOT NULL
                active BOOLEAN DEFAULT TRUE
            );
        `;

        const { rows } = await query(queryCreate)

        return rows
    } catch (error) {
        console.error(`Error al crear la tabla usuarios. ERROR: ${error}`)
    }
};

