import express from "express";
import {
  createSpecialtyController,
  deleteSpecialtyController,
  getAllSpecialtiesController,
  getSingleSpecialtyController,
  updateSpecialtyController,
} from "./../controllers/specialtyController.js";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas
// Crear especialidad
router.post(
  "/create-specialty",
  requireSignIn,
  isAdmin,
  createSpecialtyController
);

// Actualizar especialidad
router.put(
  "/update-specialty/:id",
  requireSignIn,
  isAdmin,
  updateSpecialtyController
);

// Obtener todas las especialidades
router.get("/get-specialties", getAllSpecialtiesController);

// Obtener una sola especialidad
router.get("/single-specialty/:slug", getSingleSpecialtyController);


// Eliminar especialidad
router.delete(
  "/delete-specialty/:id",
  requireSignIn,
  isAdmin,
  deleteSpecialtyController
);

export default router;
