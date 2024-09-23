import express from "express";
import multer from "multer"; // Importar multer para manejar la subida de archivos
import {
  createMarketingCampaignController,
  deleteMarketingCampaignController,
  getAllMarketingCampaignsController,
  getSingleMarketingCampaignController,
  updateMarketingCampaignController,
  getMarketingCampaignsByUserController
} from "../controllers/marketingCampaignController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Configuración de multer para almacenar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split("/")[1]); // Nombre único para la imagen
  }
});

const upload = multer({ storage: storage }); // Usamos el almacenamiento configurado para multer

// Crear una nueva campaña de marketing con imagen (solo admin)
router.post("/create-campaign", requireSignIn, isAdmin, upload.single('image'), createMarketingCampaignController);

// Actualizar una campaña de marketing (solo admin)
// Actualizar una campaña de marketing con imagen (solo admin)
router.put("/update-campaign/:id", requireSignIn, isAdmin, upload.single('image'), updateMarketingCampaignController);

// Obtener todas las campañas de marketing (sin restricción)
router.get("/get-campaigns", getAllMarketingCampaignsController);

// Obtener una campaña de marketing por ID (sin restricción)
router.get("/get-campaign/:id", getSingleMarketingCampaignController);

// Obtener campañas de marketing por usuario (sin restricción)
router.get("/get-campaigns-by-user/:userId", getMarketingCampaignsByUserController);

// Eliminar una campaña de marketing (solo admin)
router.delete("/delete-campaign/:id", requireSignIn, isAdmin, deleteMarketingCampaignController);

export default router;
