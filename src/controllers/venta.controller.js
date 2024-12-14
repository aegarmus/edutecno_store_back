import { ValidationError } from "../errors/TypesError.js";
import { Ventas } from "../models/Vental.model.js";



export const createVenta = async(req, res, next) => {
    try {
        const saleData = req.body;
        
        if(!saleData.productos || !Array.isArray(saleData.productos) || saleData.productos.length === 0){
            throw new ValidationError('Debes proporcionar una lista de productos con al menos un elemento');
        } 

        const ventaCreada = await Ventas.createVentaConProductos(saleData);

        res.status(201).json({
            message: 'Venta registrada con éxito',
            status: 201,
            data: ventaCreada
        })
    } catch (error) {
        next(error)
    }
}