import { query } from "../../config/db.config.js";
import { InternalServerError } from "../../errors/TypesError.js";
import { normalizeClauses, parseObjectToColumnsValuesArrays } from "../shares/normalize.js";



/**
 * Crea un nuevo registro en una tabla especifica a traves de un objeto
 * @param {string} tableName - Nombre de la tabla en la base de datos
 * @param {object} data - Datos que se enviaran a registrar
 * @returns {Promise<object>} - Retorna el registro creado en formato de objeto
 */
export const createRecord = async(tableName, data) => { 
    try {
        const { columns, values } = parseObjectToColumnsValuesArrays(data)

        const valuesClauses = normalizeClauses(columns, ', ', false)

        const insertQuery = `
            INSERT INTO ${tableName} (${columns.join(', ')})
            VALUES (${valuesClauses})
            RETURNING *;
        `

        const { rows } = await query(insertQuery, values);
        return rows[0];
    } catch (error) {
        throw new InternalServerError(`Error al registrar datos en la tabla ${tableName}`, error);
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
        const { columns, values } = parseObjectToColumnsValuesArrays(filters);

        const whereClauses = normalizeClauses(columns, condition, true)
        /* const whereClausesString = whereClauses.join(' ${condition} ') */

        const selectQuery = `
            SELECT * FROM ${tableName}
            WHERE ${whereClauses}
            `
        const { rows } = await query(selectQuery, values);
        return rows
    } catch (error) {
        throw new InternalServerError(`
                Error al consultar la tabla ${tableName} con los filtros:
                ${JSON.stringify(filters)}
            `,
             error
        )
    }
}


/**
 * Actualiza un registro de la Base de datos a traves de su ID
 * @param {string} tableName - Nombre de la tabla
 * @param {string} id - ID del registro a actualizar como UUID
 * @param {object} data - Datos que se desean actualizar en formato Objeto
 * @returns {Promise<Object>} - Retorna el registro actualizado como Objeto
 */

export const updateRecord = async(tableName, id, data) => {
    try {
      const { columns, values } = parseObjectToColumnsValuesArrays(data);

      /*
        const setClauses = columns.map((column, index) => `${column} = $${index + 2}`).join(", ");

        const updateQuery = `
            UPDATE ${tableName}
            SET ${setClauses} 
            WHERE id = $1
        `
        */

      const setClauses = normalizeClauses(columns, ', ', true)

      const updateQuery = `
            UPDATE ${tableName}
            SET ${setClauses} 
            WHERE id = $${columns.length + 1}
            RETURNING *;
        `;

      const params = [...values, id]

      const { rows } = await query(updateQuery, params)
      return rows[0]
    } catch (error) {
        throw new InternalServerError('Problemas para actualizar el usuario', error);
    }
}