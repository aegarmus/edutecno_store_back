import { Validation } from "../utils/validate/Validate.js";


export class Ventas {
  static validate(data) {
    const errors = [];

    const { user_id, total, date } = data;
    let user_idValido, totalValido, dateValido;

    try {
      user_idValido = Validation.isNonEmptyString(user_id, "user_id");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      totalValido = Validation.isPositiveInteger(total, "total");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      if (date) {
        dateValido = Validation.isValidDate(date, "date");
      }
    } catch (error) {
      errors.push(error.message);
    }

    if (errors.length > 0) {
      throw new ValidationError("Errores al validar Venta", errors);
    }

    return {
      user_id: user_idValido,
      total: totalValido,
      date: dateValido || new Date(),
    };
  }
}