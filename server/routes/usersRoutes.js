import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getSingleUserController,
  getUsersByRoleController,
  updateUserController
} from "../controllers/userController.js";
import { isAdmin, isAdminOrSpeaker, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crear usuario (solo admin)
router.post("/create-user", requireSignIn, isAdmin, createUserController);

// Actualizar usuario (admin o speaker)
router.put("/update-user/:uid", requireSignIn, isAdminOrSpeaker, updateUserController);

// Obtener todos los usuarios (sin restricción)
router.get("/get-users", getAllUsersController);

// Obtener un usuario (sin restricción)
router.get("/getUser/:uid", getSingleUserController);

// Obtener usuarios por rol (sin restricción, pero puedes ajustar si es necesario)
router.get("/getUsers/role/:role", getUsersByRoleController);

// Eliminar usuario (solo admin)
router.delete("/delete-user/:uid", requireSignIn, isAdmin, deleteUserController);

export default router;
