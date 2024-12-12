import { Router } from 'express';

import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Producto } from '../models/Product.Model.js';
import { createProduct } from '../controllers/producto.controllers.js';



const router = Router();

router.post('/producto', validationMiddleware(Producto.validate), createProduct);

export default router