import { query } from "../../../config/db.config.js";
import { InternalServerError } from "../../../errors/TypesError.js";
import { findActiveRecordById } from "../GET/getActiveRecords.js";


/**
 * Elimina permanente un registro de la base de datos a traves de un ID dado
 * @param {string} tableName - Nombre de la tabla
 * @param {string} id - ID del registro que se quiere eliminar en UUID
 * @returns {Promise<object>} - Retorna un objeto con los datos del registro eliminado
 */


export const permaDeleteRecord = async (tableName, id) => {
  try {
    const recordToDelete = findActiveRecordById(tableName, id);

    const deleteQuery = `
            DELETE ON CASCADE FROM ${tableName}
            WHERE id = $1
            RETURNING *;
        `;

    await query(deleteQuery, [id]);

    return recordToDelete;
  } catch (error) {
    throw new InternalServerError(
      "Error al eliminar el dato solicitado",
      error
    );
  }
};

/**
 * Elimina lógicamente un registro cambiando su estado activo de true a false
 * @param {string} tableName - Nombre de la tabla
 * @param {string} id - ID del registro a eliminar logicamente en formato UUID
 * @returns {Promise<object>} - Retorna el objeto de que se esta eliminando
 */

export const softDeleteRecord = async (tableName, id) => {
  try {
    const deleteQuery = `
            UPDATE ${tableName}
            SET active = false
            WHERE id = $1 AND active = true
            RETURNING *;
        `;

    const { rows } = await query(deleteQuery, [id]);
    return rows[0];
  } catch (error) {
    throw new InternalServerError(
      "Error al eliminar el dato solicitado",
      error
    );
  }
};
