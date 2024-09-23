import express from "express";
import {
    createAppointmentController,
    deleteAppointment,
    deleteAppointmentController,
    getAllAppointments,
    getAllAppointmentsController,
    getAppointmentByIdController,
    getAppointmentsForCurrentUser,
    getAppointmentsWithoutPayment,
    getAvailableTimesController,
    sendManualRemindersController,
    updateAppointmentController,
} from "../controllers/appointmentController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener citas completadas sin pago para el usuario autenticado
router.get('/no-payment', requireSignIn, getAppointmentsWithoutPayment);

// Crear una nueva cita para el usuario autenticado
router.post("/create-appointment", requireSignIn, createAppointmentController);

// Obtener todas las citas (solo accesible para administradores)
router.get("/get-appointments", requireSignIn, isAdmin, getAllAppointmentsController);

// Obtener las citas del usuario autenticado
router.get("/my-appointments", requireSignIn, getAppointmentsForCurrentUser);

// Obtener una cita específica por ID para el usuario autenticado
router.get("/get-appointment/:id", requireSignIn, getAppointmentByIdController);

// Actualizar una cita por ID para el usuario autenticado
router.put("/update-appointment/:id", requireSignIn, updateAppointmentController);

// Eliminar una cita por ID para el usuario autenticado
router.delete("/delete-appointment/:id", requireSignIn, deleteAppointmentController);

// Eliminar una cita por ID sin autenticación (simplified delete)
router.delete("/delete-appointment-simple/:id", deleteAppointment); // New simplified delete route

// Ruta para obtener todas las citas sin ningún filtro (solo administradores)
router.get("/all-appointments", requireSignIn, isAdmin, getAllAppointments);

// Ruta para enviar recordatorios manualmente
router.post("/send-manual-reminders", requireSignIn, sendManualRemindersController);

// Ruta para obtener los horarios disponibles de un médico en una fecha específica
router.get("/get-available-times", getAvailableTimesController); // Nueva ruta para obtener horarios disponibles

export default router;
