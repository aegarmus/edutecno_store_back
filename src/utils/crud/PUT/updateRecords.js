import { query } from "../../../config/db.config.js";
import { InternalServerError } from "../../../errors/TypesError.js";
import { normalizeClauses, parseObjectToColumnsValuesArrays } from "../../shares/normalize.js";



/**
 * Actualiza un registro de la Base de datos a traves de su ID
 * @param {string} tableName - Nombre de la tabla
 * @param {string} id - ID del registro a actualizar como UUID
 * @param {object} data - Datos que se desean actualizar en formato Objeto
 * @returns {Promise<Object>} - Retorna el registro actualizado como Objeto
 */


export const updateRecord = async (tableName, id, data) => {
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

    const setClauses = normalizeClauses(columns, ", ");

    const updateQuery = `
            UPDATE ${tableName}
            SET ${setClauses} 
            WHERE id = $${columns.length + 1}
            RETURNING *;
        `;

    const params = [...values, id];

    const { rows } = await query(updateQuery, params);
    return rows[0];
  } catch (error) {
    console.error(error)
    throw new InternalServerError(
      "Problemas para actualizar el usuario",
      error
    );
  }
};
