import { v4 as uuidv4 } from 'uuid'
import { createRecord } from '../utils/crud/index.js';
import { DataBaseError } from '../errors/TypesError.js';


export class VentasProductos {
  static validate(data) {
    const errors = [];

    const { venta_id, producto_id, cantidad, subtotal } = data;
    let venta_idValido, producto_idValido, cantidadValida, subtotalValido;

    try {
      venta_idValido = Validation.isNonEmptyString(venta_id, "venta_id");
      producto_idValido = Validation.isNonEmptyString(
        producto_id,
        "producto_id"
      );
    } catch (error) {
      errors.push(error.message);
    }

    try {
      cantidadValida = Validation.isPositiveInteger(cantidad, "cantidad");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      subtotalValido = Validation.isPositiveInteger(subtotal, "subtotal");
    } catch (error) {
      errors.push(error.message);
    }

    if (errors.length > 0) {
      throw new ValidationError("Errores al validar Venta_Producto", errors);
    }

    return {
      venta_id: venta_idValido,
      producto_id: producto_idValido,
      cantidad: cantidadValida,
      subtotal: subtotalValido,
    };
  }

  static async create(data) {
    try {
        const id = uuidv4();
        const ventaProductoData = { id, ...data };

        const ventaProducto = await createRecord('ventas_productos', ventaProductoData);
        return ventaProducto;
    } catch (error) {
        throw new DataBaseError(`Error al registrar la venta del producto`, error)
    }
  }
}