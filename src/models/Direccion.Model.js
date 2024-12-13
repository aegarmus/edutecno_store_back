import { DataBaseError } from "../errors/TypesError.js";
import { createRecord } from "../utils/crud.js";



export class Direccion {
  constructor(user_id, calle, numero, comuna, region, ciudad, zip_code) {
    this.user_id = user_id;
    this.calle = calle;
    this.numero = numero;
    this.comuna = comuna;
    this.region = region;
    this.ciudad = ciudad;
    this.zip_code = zip_code;
  }

  static validate(data) {
    const errors = [];

    const { user_id, calle, numero, comuna, region, ciudad, zip_code } = data;
    let user_idValido,
      calleValido,
      numeroValido,
      comunaValido,
      regionValido,
      ciudadValido,
      zip_codeValido;

    try {
      user_idValido = Validation.isNonEmptyString(user_id, "user_id");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      calleValido = Validation.isNonEmptyString(calle, "calle");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      numeroValido = Validation.isNonEmptyString(numero, "numero");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      comunaValido = Validation.isNonEmptyString(comuna, "comuna");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      regionValido = Validation.isNonEmptyString(region, "region");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      ciudadValido = Validation.isNonEmptyString(ciudad, "ciudad");
    } catch (error) {
      errors.push(error.message);
    }

    try {
      zip_codeValido = Validation.isNonEmptyString(zip_code, "zip_code");
      zip_codeValido = Validation.postalCode(zip_code, 'zip_code');
    } catch (error) {
      errors.push(error.message);
    }

    if (errors.length > 0)
      throw new ValidationError("Error al validar Direccion", errors);

    return {
      user_id: user_idValido,
      calle: calleValido,
      numero: numeroValido,
      comuna: comunaValido,
      region: regionValido,
      ciudad: ciudadValido,
      zip_code: zip_codeValido,
    };
  }

  static async create(data) {
    try {
      const id = uuidv4();

      const address = { id, ...data };

      const addressRecorded = await createRecord("direccion", address);
      return addressRecorded;
    } catch (error) {
      throw new DataBaseError(
        "Error al registrar el usuario en la base de datos",
        error
      );
    }
  }

  static async findAllActive() {
    try {
      const address = await findAllActiveRecords("direccion");
      return address;
    } catch (error) {
      throw new DataBaseError(
        `Error al obtener los registros delas direcciones en la base de datos`,
        error
      );
    }
  }

  static async findById(id) {
    try {
      const address = await findActiveRecordById("direccion", id);
      return address;
    } catch (error) {
      throw new DataBaseError(
        `No pudimon encontrar la dirección con el id ${id}`,
        error
      );
    }
  }

  static async update(id, data) {
    try {
      const updatedAddress = await updateRecord("direccion", id, data);
      return updatedAddress;
    } catch (error) {
      throw new DataBaseError(
        `No pudimos actualizar la dirección con el ID: ${id}`,
        error
      );
    }
  }

  static async permaDelete(id) {
    try {
      const addressDeleted = await permaDeleteRecord("direccion", id);
      return addressDeleted;
    } catch (error) {
      throw new DataBaseError(
        `No pudimos eliminar al permanentemente la dirección`,
        error
      );
    }
  }
}