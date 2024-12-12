import { query } from "../../../config/db.config.js";
import { InternalServerError } from "../../../errors/TypesError.js";
import { normalizeClauses, parseObjectToColumnsValuesArrays } from "../../shares/normalize.js";

/**
 * Crea un nuevo registro en una tabla especifica a traves de un objeto
 * @param {string} tableName - Nombre de la tabla en la base de datos
 * @param {object} data - Datos que se enviaran a registrar
 * @returns {Promise<object>} - Retorna el registro creado en formato de objeto
 */
export const createRecord = async (tableName, data) => {
  try {
    const { columns, values } = parseObjectToColumnsValuesArrays(data);

    const valuesClauses = normalizeClauses(columns, ", ", 1, false);

    const insertQuery = `
            INSERT INTO ${tableName} (${columns.join(", ")})
            VALUES (${valuesClauses})
            RETURNING *;
        `;

    const { rows } = await query(insertQuery, values);
    return rows[0];
  } catch (error) {
    throw new InternalServerError(
      `Error al registrar datos en la tabla ${tableName}`,
      error
    );
  }
};
