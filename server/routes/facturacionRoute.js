import express from "express";
import {
  createInvoiceController,
  deleteInvoiceController,
  getAllInvoicesController,
  getSingleInvoiceController,
  updateInvoiceController
} from "../controllers/facturacionController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crear una nueva factura (solo admin)
router.post("/create-invoice", requireSignIn, isAdmin, createInvoiceController);

// Actualizar una factura (solo admin)
router.put("/update-invoice/:id", requireSignIn, isAdmin, updateInvoiceController);

// Obtener todas las facturas (sin restricción)
router.get("/get-invoices", getAllInvoicesController);

// Obtener una factura por ID (sin restricción)
router.get("/get-invoice/:id", getSingleInvoiceController);

// Eliminar una factura (solo admin)
router.delete("/delete-invoice/:id", requireSignIn, isAdmin, deleteInvoiceController);

export default router;
