import { ValidationError } from "../../errors/TypesError.js"


export class Validation {
    static isNonEmptyString(value, fieldName) {
        if(typeof value !== 'string' || value.trim() === '') {
            throw new ValidationError(`${fieldName} no puede ser una cadena de texto vacía`, error)
        }

        return value
    }
}