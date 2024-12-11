import { Router } from 'express'
import { createUser, findAllActiveUsers, findUserActiveById, findUserByFilters, updateUser } from '../controllers/usuario.controller.js';
import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Usuario } from '../models/Usuario.model.js';


const router = Router();

router.post('/usuario', validationMiddleware(Usuario.validate), createUser);
router.get('/usuario', findAllActiveUsers);
router.get('/usuario/id/:id', findUserActiveById);
router.get('/usuario/filters', findUserByFilters);
router.put('/usuario/:id', validationMiddleware(Usuario.validate), updateUser);


export default router

/* e86646c9-c8a8-4473-b08a-d4dad05e9f32*/