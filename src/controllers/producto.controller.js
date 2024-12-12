import { Producto } from "../models/Product.Model.js";
import { Validation } from "../utils/validate/Validate.js";


export const createProduct = async(req, res, next) => {
    try {
        const product = await Producto.create(req.body);

        res.status(201).json({
            message: "Producto creado correctamente",
            status: 200,
            data: product
        })
    } catch (error) {
        next(error)
    }
}


export const findAllActiveProducts = async(req, res, next) => {
    try {
        const products = await Producto.findAllActive();
        const productValidate = Validation.isEmptyDataResponse(products);

        res.status(200).json({
            message: `Productos Encontrados con éxito`,
            status: 200,
            data: productValidate
        });
    } catch (error) {
        next(error)
    }
}


export const findActiveProductById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Producto.findActiveById(id)
        const productValidate = Validation.isEmptyDataResponse(product);

        res.status(200).json({
            message: `Usuario con ID_ ${id} Encontrado con éxito`,
            status: 200,
            data: productValidate,
        })

    } catch (error) {
        next(error)
    }
}