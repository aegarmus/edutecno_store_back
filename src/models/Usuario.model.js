import { v4 as uuidv4 } from 'uuid'
import { query } from '../config/db.config.js';
import { DataBaseError, ValidationError } from '../errors/TypesError.js';
import { Validation } from '../utils/validate/Validate.js';


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

    static validate(data) {
        const errors = [];

        const { nombre, apellido_paterno, apellido_materno, email, telefono } = data
        let nombreValido, apellido_paternoValido, apellido_maternoValido, emailValido, telefonoValido

        try {
            nombreValido = Validation.isNonEmptyString(nombre, 'nombre');
            nombreValido = Validation.name(nombre, 'nombre');
        } catch (error) {
            errors.push(error.message)
        }

        try {
            apellido_paternoValido = Validation.isNonEmptyString(apellido_paterno, 'apellido_paterno');
            apellido_paternoValido = Validation.name(apellido_paterno, 'apellido_paterno');
        } catch (error) {
            errors.push(error.message);
        }

        try {
          apellido_maternoValido = Validation.isNonEmptyString(apellido_materno, 'apellido_paterno');
          apellido_maternoValido = Validation.name(apellido_materno, 'apellido_paterno');
        } catch (error) {
          errors.push(error.message);
        }

        try {
          emailValido = Validation.isNonEmptyString(email, 'email');
          emailValido = Validation.email(email);
        } catch (error) {
          errors.push(error.message);
        }

        try {
            telefonoValido = Validation.isNonEmptyString(telefono, 'telefono');
            telefonoValido = Validation.phone(telefono);
        } catch (error) {
            errors.push(error.message);
        }

        if(errors.length > 0) throw new ValidationError('Error al validar Usuario', errors)

        return {
            nombre: nombreValido,
            apellido_paterno: apellido_paternoValido,
            apellido_materno: apellido_maternoValido,
            email: emailValido,
            telefono: telefonoValido
        }
    }


    static async create(data) {
        try {

            /*  Usuario.validate(data); */

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