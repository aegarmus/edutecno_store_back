import { v4 as uuidv4 } from 'uuid'
import { query } from '../config/db.config.js';
import { DataBaseError } from '../errors/TypesError.js';


export class Usuario {
    constructor({ id, nombre, apellido_paterno, apellido_materno, email, telefono }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.email = email;
        this.telefono = telefono;
        this.active = true
    }


    static async create(data) {
        try {
            const { nombre, apellido_paterno, apellido_materno, email, telefono } = data;
            const id = uuidv4();
            const active = true;

            const insertQuery = `
                INSERT INTO usuarios (id, nombre, apellido_paterno, apellido_materno, email, telefono, active)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `
            const values = [id, nombre, apellido_paterno, apellido_materno, email, telefono, active];

            const { rows } = await query(insertQuery, values);
            return rows[0]
        } catch (error) {
            throw new DataBaseError('Error al registrar el usuario en la base de datos', error)
        }
    }
}