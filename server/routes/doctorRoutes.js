import express from "express";
import {
    createDoctorController,
    deleteDoctorController, // Renamed to match the controller
    getDoctorByIdController,
    getDoctorsController, // Renamed to match the controller
    updateDoctorController,
} from "./../controllers/doctorController.js";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
// Create a doctor
router.post(
  "/create-doctor",
  requireSignIn,
  isAdmin,
  createDoctorController
);

// Update a doctor
router.put(
  "/update-doctor/:id",
  requireSignIn,
  isAdmin,
  updateDoctorController
);

// Get all doctors
router.get("/get-doctors", getDoctorsController);

// Get a single doctor by ID
router.get("/get-doctor/:id", getDoctorByIdController);

// Delete a doctor
router.delete(
  "/delete-doctor/:id",
  requireSignIn,
  isAdmin,
  deleteDoctorController
);

export default router;
