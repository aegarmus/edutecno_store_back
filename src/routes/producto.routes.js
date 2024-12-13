import { Router } from 'express';

import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Producto } from '../models/Product.Model.js';
import { createProduct, findActiveProductById, findAllActiveProducts, findProductByFilters, permaDeleteProduct, softDeleteProduct, updateProduct } from '../controllers/producto.controller.js';



const router = Router();

router.post('/producto', validationMiddleware(Producto.validate), createProduct);
router.get('/producto', findAllActiveProducts);
router.get('/producto/id/:id', findActiveProductById);
router.get(`/producto/filters`, findProductByFilters);
router.put('/producto/:id', validationMiddleware(Producto.validate), updateProduct);
router.delete('/producto/admin/delete/permant/:id', permaDeleteProduct);
router.delete('/producto/:id', softDeleteProduct)


export default router