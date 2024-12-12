import { v4 as uuidv4 } from "uuid";
import { DataBaseError, ValidationError } from "../errors/TypesError.js";
import { Validation } from "../utils/validate/Validate.js";
import {
  createRecord,
  findActiveRecordById,
  findAllActiveRecords,
  findRecordByFilters,
  permaDeleteRecord,
  softDeleteRecord,
  updateRecord,
} from "../utils/crud/index.js";


export class Producto {
    constructor(id, nombre, descripcion, price, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.price = price;
        this.stock = stock;
        this.active = true;
    }

    static validate(data) {
        const errors = []

        const { nombre, descripcion, price, stock } = data;
        let nombreValido, descripcionValida, priceValido, stockValido;

        try {
            nombreValido = Validation.isNonEmptyString(nombre, "nombre");
            nombreValido = Validation.isString(nombre, "nombre");
        } catch (error) {
            errors.push(error.message);
        }

        try {
            descripcionValida = Validation.isNonEmptyString(descripcion, 'descripcion');
            descripcionValida = Validation.isString(descripcion, 'descripcion');
        } catch (error) {
            errors.push(error.message)
        }

        try {
            priceValido = Validation.isNumber(price, 'precio');
            priceValido = Validation.isPositiveInteger(price, 'precio');
        } catch(error) {
            errors.push(error.message)
        }

        try {
            stockValido = Validation.isNumber(stock, 'stock');
            stockValido = Validation.isPositiveInteger(stock, 'stock');
        } catch (error) {
            errors.push(error)
        }

        if (errors.length > 0) throw new ValidationError("Error al validar Producto", errors);

        return {
            nombre: nombreValido,
            descripcion: descripcionValida,
            price: priceValido,
            stock: stockValido
        }

    }

    static async create(data) {
        try {
            const id = uuidv4()
            const active = true;

            const product = { id, ...data, active }

            const productRecorded = await createRecord('productos', product)
            return productRecorded
        } catch (error) {
            throw new DataBaseError("Error al registrar el producto en la base de datos", error);
        }
    }
}