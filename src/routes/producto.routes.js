import { Router } from 'express';

import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Producto } from '../models/Product.Model.js';
import { createProduct, findActiveProductById, findAllActiveProducts, findProductByFilters } from '../controllers/producto.controller.js';



const router = Router();

router.post('/producto', validationMiddleware(Producto.validate), createProduct);
router.get('/producto', findAllActiveProducts);
router.get('/producto/id/:id', findActiveProductById);
router.get(`/producto/filters`, findProductByFilters);


export default router