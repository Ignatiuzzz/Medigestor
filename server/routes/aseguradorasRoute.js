import express from "express";
import {
  createInsurerController,
  deleteInsurerController,
  getAllInsurersController,
  getSingleInsurerController,
  updateInsurerController
} from "../controllers/aseguradorasController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crear aseguradora (solo admin)
router.post("/create-issuers", requireSignIn, isAdmin, createInsurerController);

// Actualizar aseguradora (solo admin)
router.put("/update-insurer/:id", requireSignIn, isAdmin, updateInsurerController);

// Obtener todas las aseguradoras (sin restricción)
router.get("/get-issuers", getAllInsurersController);

// Obtener una aseguradora por ID (sin restricción)
router.get("/get-insurer/:id", getSingleInsurerController);

// Eliminar aseguradora (solo admin)
router.delete("/delete-insurer/:id", requireSignIn, isAdmin, deleteInsurerController);

export default router;
