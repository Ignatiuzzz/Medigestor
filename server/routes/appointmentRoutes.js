import express from "express";
import {
    createAppointmentController,
    deleteAppointmentController,
    getAllAppointmentsController,
    getAppointmentByIdController,
    updateAppointmentController,
    getAppointmentsWithoutPayment,
} from "../controllers/appointmentController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get('/no-payment', getAppointmentsWithoutPayment);
// Routes for appointment management

// Create a new appointment
router.post("/create-appointment", requireSignIn, createAppointmentController);

// Get all appointments
router.get("/get-appointments", requireSignIn, isAdmin, getAllAppointmentsController);

// Get a single appointment by ID
router.get("/get-appointment/:id", requireSignIn, isAdmin, getAppointmentByIdController);

// Update an appointment by ID
router.put("/update-appointment/:id", requireSignIn, isAdmin, updateAppointmentController);

// Delete an appointment by ID
router.delete("/delete-appointment/:id", requireSignIn, isAdmin, deleteAppointmentController);

export default router;
