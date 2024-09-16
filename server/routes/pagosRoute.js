import express from "express";
import {
  createPaymentController,
  deletePaymentController,
  getAllPaymentsController,
  getSinglePaymentController,
  updatePaymentController
} from "../controllers/pagosController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crear un nuevo pago (solo admin)
router.post("/create-payment", requireSignIn, isAdmin, createPaymentController);

// Actualizar un pago (solo admin)
router.put("/update-payment/:id", requireSignIn, isAdmin, updatePaymentController);

// Obtener todos los pagos (sin restricción)
router.get("/get-payments", getAllPaymentsController);

// Obtener un pago por ID (sin restricción)
router.get("/get-payment/:id", getSinglePaymentController);

// Eliminar un pago (solo admin)
router.delete("/delete-payment/:id", requireSignIn, isAdmin, deletePaymentController);

export default router;
