import { ValidationError } from "../../errors/TypesError.js"


export class Validation {
    static isNonEmptyString(value, fieldName) {
        if(typeof value !== 'string' || value.trim() === '') {
            throw new ValidationError(`${fieldName} no puede ser una cadena de texto vacía`, error)
        }
        return value
    }

    static name(value, fieldName) {
        const regex = /^[a-zA-ZÁ-ÿñÑ\s]+$/
        if(regex.test(value)) {
            throw new ValidationError(`${fieldName} debe contener solo letras y espacios`)
        }
        return value
    }

    static email(value) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(!emailRegex.test(value)) {
            throw new ValidationError('El correo no es válido' )
        }

        return value;
    }

    static isNumberInRange(value, min, max, fieldName) {
        const number = Number(value);

        if(isNaN(number)) throw new ValidationError(`${fieldName} debe ser un número`);
        if(min > number > max) throw new ValidationError(`${fieldName} debe estar entre ${min} y ${max}`);

        return number
    }

    static isPositiveInteger(value, fieldName) { //Para precios 
        const number = Number(value);
        if(!Number.isInteger(number) || number <= 0) {
            throw new ValidationError(`${fieldName} debe ser un número entero positivo`)
        }
    }

    static isNegativeInteger(value, fieldName) {
        const number = Number(value);
        if(!Number.isInteger(number) || number < 0) {
            throw new ValidationError(`${fieldName} debe ser un número entero negativo`)
        }
    }

    static isValidDate(value, fieldName) {
        const date = new Date(value);

        if(isNaN(date.getTime())) throw new ValidationError(`${fieldName} debe ser una fecha valida (YYYY-MM-DD)`);
        return date
    }

    static postalCode(value, fieldName) {
        const regex = /^\d{7}$/;

        if(!regex.test(value)) throw new ValidationError(`${fieldName} debe ser un código postal válido de 7 dígitos`)
        return value
    }

    static isBoolean(value, fieldName) {
        if(typeof value !== 'boolean') throw new ValidationError(`${fieldName} debe ser verdadero o falso`)
        return value
    }
}

