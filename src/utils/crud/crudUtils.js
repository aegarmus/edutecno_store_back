import { query } from "../../config/db.config.js";
import { InternalServerError } from "../../errors/TypesError.js";
import { Validation } from "../validate/Validate.js";


/**
 * Crea un nuevo registro en una tabla especifica a traves de un objeto
 * @param {string} tableName - Nombre de la tabla en la base de datos
 * @param {object} data - Datos que se enviaran a registrar
 * @returns {Promise<object>} - Retorna el registro creado en formato de objeto
 */
export const createRecord = async(tableName, data) => { 
    try {
        const columnsData = Object.keys(data) //Devuelve un Array con todas las Keys o claves de un objeto dado
        const valuesData = Object.values(data) // Devuelve un Array con todos los valores de un objeto dado

        const { columns, values } = Validation.isDataEmptyToDataBase(columnsData, valuesData)

        const placeholders = columns.map((_, i) => `$${i + 1}` );

        const insertQuery = `
            INSERT INTO ${tableName} (${columns.join(', ')})
            VALUES (${placeholders.join(', ')})
            RETURNING *
        `
        const { rows } = await query(insertQuery, values);
        return rows[0];
    } catch (error) {
        throw new InternalServerError(`Error al registrar datos en la tabla ${tableName}`);
    }

}

/**
 * Obtiene todos los registros activos de una tabla dada
 * @param {string} tableName - Nombre de la tabla a consultar
 * @returns {Promise<Array>} - Retorna un arreglo de forma asincrona con todos los registros activos
 */
export const findAllActiveRecords = async(tableName) => {
    try {
        const selectQuery = `SELECT * FROM ${tableName} WHERE active = true;`
        
        const { rows } = await query(selectQuery)
        return rows
    } catch (error) {
        throw new InternalServerError(`Error al obtener los registros de la tabla${tableName}`, error)
    }
}


/**
 * Obtiene un registro particular que este activo a traves de un UUID entregado 
 * @param {string} tableName - Nombre de la tabla a consultar
 * @param {string} id - UUID del registro que se busca
 * @returns {Promise<Object>} - Retorna un registro encontrado a partir del ID y que este activo.
 */
export const findActiveRecordById = async(tableName, id) => {
    try {
        const selectQuery = `
            SELECT * FROM ${tableName}
            WHERE id = $1 AND active = true
        `
        const { rows } = await query(selectQuery, [id]);
        return rows[0]
    } catch (error) {
        throw new InternalServerError('No pudiimos Encontrar los registros con el id entregado', error);
    }
};


/**
 * Busca dentro de una tabla en la Base de Datos a traves de un filtro en formato de Objeto y una conditión SQL del tipo AND u OR (o equivalente)
 * @param {string} tableName - Nombre de la tabla a consultar 
 * @param {object} filters - Objeto con los filtros que contiene el nombre del campo y el valor a buscar 
 * @param {string} condition - Condición de busqueda excluyente o incluyente (AND / OR)
 * @returns {Promise<Array>} - Devuelve un Arreglo con los objetos del resultado de la busqueda 
 */

export const findRecordByFilters = async(tableName, filters, condition) => {
    try {
        const filterKeys = Object.keys(filters); //Arreglo con todas las keys del objeto
        const filterValues = Object.values(filters);

        const whereClauses = filterKeys.map((key, index) => `${key} = $${index + 1}`).join(` ${condition} `);
        /* const whereClausesString = whereClauses.join(' ${condition} ') */

        const selectQuery = `
            SELECT * FROM ${tableName}
            WHERE ${whereClauses}
            `
        const { rows } = await query(selectQuery, filterValues);
        return rows
    } catch (error) {
        throw new InternalServerError(`
                Error al consultar la tabla ${tableName} con los filtros:
                ${filters}
            `,
             error
        )
    }
}

