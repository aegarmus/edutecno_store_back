
import { InternalServerError } from "../../errors/TypesError.js";
import { Validation } from "../validate/Validate.js";
/**
 * Convierte datos de una petición en arrays de columnas y valores para ser inyectados en una consulta SQL
 * @param {object} data - Data que contiene columnas y valores para una Consulta SQL 
 * @returns {object<Array>} - Devuelve un Objeto con dos arrays en los campos columns y values
 */

export const parseObjectToColumnsValuesArrays = (data) => {
    try {
        const columnsData = [];
        const valuesData = [];

        Object.entries(data).forEach(([key, value]) => {
            if(Array.isArray(value)) {
                columnsData.push(key);
                value.forEach((val) => {
                    valuesData.push(val)
                })
            } else {
                columnsData.push(key);
                valuesData.push(val);
            }
        })
        
/*         const columnsData = Object.keys(data);
        const valuesData = Object.values(data); */

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
 * @param {boolean} requireKey - Valor booleano (true/false) que determina si la clausula requiere acompañar los valores paramatrizados con una key. Valor por defecto true
 * @param {number} initParam - Número con el que comenzara la cuenta de los parametros. Por defecto si no se ingresa comienza en 1
 * @returns {string} - Retorna la clausula con datos parametrizados en formato string
 */
export const normalizeClauses = (columns, separator, initParam = 1, requireKey = true, filters = {}) => {
    try {
        /* let clauses = '' */
       /*  !requireKey
        ? clauses = columns.map((_, i) => `$${i + initParam}` ).join(`${separator}`)
        : clauses = columns.map((key, index) => `${key} = $${index + initParam}`).join(`${separator}`);
        /* return clauses */

        let clauses='';

        if(!requireKey) {
            clauses = columns.map((_, index) => `$${index + initParam}` ).join(` ${separator} `)
        } else {
            const clausesFilter = columns.map((key, index) => {
                if(Array.isArray(filters[key]) && filters[key].length === 2) {
                    return `${key} BETWEEN $${index + initParam} AND $${index + initParam + 1}`;
                }

                return `${key} = $${index + initParam}`;
            })

            clauses = clausesFilter.join(` ${separator} `)
        }

        return clauses

    } catch (error) {
        throw new InternalServerError('Error al construir la clausula para la consulta SQL', error)
    }
}


/* 
const objeto = {
    nombre

}

objeto.nombre
objeto['nombre']

*/