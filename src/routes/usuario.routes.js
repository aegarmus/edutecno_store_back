import { Router } from 'express'
import { createUser, findAllActiveUsers, findUserActiveById, findUserByFilters } from '../controllers/usuario.controller.js';
import { validationMiddleware } from '../middlewares/validate.middleware.js';
import { Usuario } from '../models/Usuario.model.js';


const router = Router();

router.post('/usuario', validationMiddleware(Usuario.validate), createUser);
router.get('/usuario', findAllActiveUsers);
router.get('/usuario/id/:id', findUserActiveById);
router.get('/usuario/filters', findUserByFilters);


export default router