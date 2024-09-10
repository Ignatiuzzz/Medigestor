import express from "express";
import {
  loginController,
  registerController,
  forgotPasswordController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, isAdminOrSpeaker, isSpeaker, requireSignIn } from "../middlewares/authMiddleware.js";

// Crear el objeto router
const router = express.Router();

// Rutas
// Registro || Método POST
router.post("/register", registerController);

// Inicio de sesión || Método POST
router.post("/login", loginController);

// Olvido de contraseña || Método POST
router.post("/forgot-password", forgotPasswordController);

// Rutas de prueba
router.get("/test", requireSignIn, isAdmin, isSpeaker, testController);

// Ruta protegida para autenticación de usuario
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Ruta protegida para autenticación de admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Ruta protegida para autenticación de speaker
router.get("/speaker-auth", requireSignIn, isSpeaker, (req, res) => {
  res.status(200).send({ ok: true });
});
// Ruta protegida para autenticación de speaker
router.get("/speaker-auth", requireSignIn, isAdminOrSpeaker, (req, res) => {
  res.status(200).send({ ok: true });
});

// Actualizar perfil
router.put("/profile", requireSignIn, updateProfileController);


export default router;
