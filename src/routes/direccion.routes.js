import express from "express";
import {
  createDireccion,
  findAllActiveDirecciones,
  findDireccionById,
  findDireccionByFilters,
  updateDireccion,
  permaDeleteDireccion,
} from "../controllers/direccionController.js";

const router = express.Router();


router.post("/direccon/", createDireccion);
router.get("/direccon/", findAllActiveDirecciones);
router.get("/direccon/:id", findDireccionById);
router.get("/direccon/filters", findDireccionByFilters);
router.put("/direccon/:id", updateDireccion);
router.delete("/direccon/:id", permaDeleteDireccion);

export default router;
