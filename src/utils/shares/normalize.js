
import { InternalServerError } from "../../errors/TypesError.js";
import { Validation } from "../validate/Validate.js";
/**
 * Convierte datos de una petición en arrays de columnas y valores para ser inyectados en una consulta SQL
 * @param {object} data - Data que contiene columnas y valores para una Consulta SQL 
 * @returns {object<Array>} - Devuelve un Objeto con dos arrays en los campos columns y values
 */

export const parseObjectToColumnsValuesArrays = (data) => {
    try {
        const columnsData = Object.keys(data);
        const valuesData = Object.values(data);

        const { columns, values } = Validation.isDataEmptyToDataBase(columnsData, valuesData)

        return {columns, values}
    } catch (error) {
        throw new InternalServerError('Error al convertir los datos a columnas y valores', error)        
    }
}


/**
 * Construye una clausula con valores parametrizados en función de la cantidad de campos en los datos entregados
 * @param {Array<string>} columns - Columnas que se van a modificar en la query 
 * @param {string} separator - Separador de condicion o agregación en la clausula
 * @param {boolean} requireKey - Valor booleano (true/false) que determina si la clausula requiere acompañar los valores paramatrizados con una key
 * @returns {string} - Retorna la clausula con datos parametrizados en formato string
 */
export const normalizeClauses = (columns, separator, requireKey) => {
    try {
        let clauses = ''

        !requireKey
        ? clauses = columns.map((_, i) => `$${i + 1}` ).join(`${separator}`)
        : clauses = columns.map((key, index) => `${key} = $${index + 1}`).join(`${separator}`);

        return clauses
    } catch (error) {
        throw new InternalServerError('Error al construir la clausula para la consulta SQL', error)
    }
}