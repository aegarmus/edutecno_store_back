import { v4 as uuidv4 } from 'uuid'

import { DataBaseError, InternalServerError, ValidationError } from "../errors/TypesError.js";
import { Validation } from "../utils/validate/Validate.js";
import { createRecord } from '../utils/crud/index.js';
import { Producto } from './Product.Model.js';
import { getClient } from '../config/db.config.js';
import { VentasProductos } from './VentaProducto.model.js';
import { beginTransaction, commitTransaction, rollbackTransaction } from '../utils/db/transactionCommands.js';


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

  static async createVentaConProductos(data) {
      const client = await getClient();
    try {
        
        await beginTransaction(client);
        
        const { user_id, total, date, productos } = data;
        
        if(!productos || !Array.isArray(productos) || productos.length === 0) {
          throw new ValidationError('Debes proporcionar al menos un producto en la lista');
        }

        const id = uuidv4();
      
        const ventaData = {
          id,
          user_id,
          total, 
          date
        }
  
        const venta = await createRecord('ventas', ventaData);

        let ventaTotal = 0;
        for(const producto of productos) {
            const { producto_id, cantidad, subtotal } = producto;
            
            await Producto.updateStock(producto_id, cantidad);
            
            const ventaProductoData = { venta_id: id, producto_id, cantidad, subtotal }
            console.log('data para la venta', ventaProductoData)
            await VentasProductos.create(ventaProductoData);
            
            ventaTotal += subtotal
          
        };

        if(ventaTotal !== total) {
            throw new InternalServerError('Error, los montos totales enviados por el cliente no coinciden con el calculo de los productos')
        }
        
        
        await commitTransaction(client);

        return venta
    } catch (error) {
        await rollbackTransaction(client);
        throw new DataBaseError('Error al registrar la venta del producto', error)
    }
  }
}