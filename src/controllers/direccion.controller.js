import { Direccion } from "../models/Direccion.Model.js";

export const createDireccion = async (req, res, next) => {
  try {
    const dir = await Direccion.create(req.body);
    res.status(201).json({
      message: "Dirección creada con éxito",
      data: dir,
    });
  } catch (error) {
    next(error);
  }
};

export const findAllActiveDirecciones = async (req, res, next) => {
  try {
    const dirs = await Direccion.findAllActive();
    res.status(200).json({
      message: "Direcciones encontradas con éxito",
      data: dirs,
    });
  } catch (error) {
    next(error);
  }
};

export const findDireccionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dir = await Direccion.findActiveById(id);
    res.status(200).json({
      message: `Dirección con ID ${id} encontrada`,
      data: dir,
    });
  } catch (error) {
    next(error);
  }
};

export const findDireccionByFilters = async (req, res, next) => {
  try {
    const filters = req.query;
    const dirs = await Direccion.find(filters);
    res.status(200).json({
      message: "Direcciones filtradas con éxito",
      data: dirs,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDireccion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Direccion.update(id, req.body);
    res.status(200).json({
      message: `Dirección con ID ${id} actualizada con éxito`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const permaDeleteDireccion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Direccion.permaDelete(id);
    res.status(200).json({
      message: `Dirección con ID ${id} eliminada permanentemente`,
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
