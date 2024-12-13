

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
}