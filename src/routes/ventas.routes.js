import { Router } from "express";
import { createVenta } from "../controllers/venta.controller.js";


const router = Router();

router.post('/ventas', createVenta);


export default router