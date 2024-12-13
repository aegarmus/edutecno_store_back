import { query } from "../../../config/db.config.js";
import { InternalServerError } from "../../../errors/TypesError.js";
import { normalizeClauses, parseObjectToColumnsValuesArrays } from "../../shares/normalize.js";

/**
 * Obtiene todos los registros activos de una tabla dada
 * @param {string} tableName - Nombre de la tabla a consultar
 * @returns {Promise<Array>} - Retorna un arreglo de forma asincrona con todos los registros activos
 */
export const findAllActiveRecords = async (tableName, requireActive = false) => {
  try {
    const clauseActive = 'WHERE active = true'
    const selectQuery = ''

    requireActive 
    ?selectQuery = `SELECT * FROM ${tableName} ${clauseActive}`
    :selectQuery = `SELECT * FROM ${tableName}`

    const { rows } = await query(selectQuery);
    return rows;
  } catch (error) {
    throw new InternalServerError(
      `Error al obtener los registros de la tabla${tableName}`,
      error
    );
  }
};

/**
 * Obtiene un registro particular que este activo a traves de un UUID entregado
 * @param {string} tableName - Nombre de la tabla a consultar
 * @param {string} id - UUID del registro que se busca
 * @returns {Promise<Object>} - Retorna un registro encontrado a partir del ID y que este activo.
 */
export const findActiveRecordById = async (tableName, id, requireActive = false) => {
  try {
    const clauseActive = "active = true";
    const selectQuery = "";

    requireActive
      ? (selectQuery = `
            SELECT * FROM ${tableName}
            WHERE id = $1 AND ${clauseActive}
        `)
      : (selectQuery = `
            SELECT * FROM ${tableName}
            WHERE id = $1
    `);
    
    const { rows } = await query(selectQuery, [id]);
    return rows[0];
  } catch (error) {
    throw new InternalServerError(
      "No pudiimos Encontrar los registros con el id entregado",
      error
    );
  }
};

/**
 * Busca dentro de una tabla en la Base de Datos a traves de un filtro en formato de Objeto y una conditión SQL del tipo AND u OR (o equivalente)
 * @param {string} tableName - Nombre de la tabla a consultar
 * @param {object} filters - Objeto con los filtros que contiene el nombre del campo y el valor a buscar
 * @param {string} condition - Condición de busqueda excluyente o incluyente (AND / OR)
 * @returns {Promise<Array>} - Devuelve un Arreglo con los objetos del resultado de la busqueda
 */

export const findRecordByFilters = async (tableName, filters, condition) => {
  try {
    const { columns, values } = parseObjectToColumnsValuesArrays(filters);
    const whereClauses = normalizeClauses(columns, condition, 1, true, filters);
    /* const whereClausesString = whereClauses.join(' ${condition} ') */

    const selectQuery = `
            SELECT * FROM ${tableName}
            WHERE ${whereClauses}
            `;
    const { rows } = await query(selectQuery, values);
    return rows;
  } catch (error) {
    throw new InternalServerError(
      `
                Error al consultar la tabla ${tableName} con los filtros:
                ${JSON.stringify(filters)}
            `,
      error
    );
  }
};
