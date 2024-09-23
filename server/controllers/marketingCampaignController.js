import marketingCampaignModel from "../models/marketingCampaignModel.js";
import userModel from "../models/userModel.js"; // Importamos el modelo de usuario
import { sendCampaignNotifications } from "../services/notificationService.js"; // Importamos la función de notificación


export const createMarketingCampaignController = async (req, res) => {
  try {
    const { title, description, startDate, endDate, targetAudience, notifications, user } = req.body;

    // Verificar si se ha cargado una imagen y almacenar su ruta
    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path; // La ruta donde multer ha guardado la imagen
    }

    // Crear la nueva campaña de marketing
    const newCampaign = new marketingCampaignModel({
      title,
      description,
      startDate,
      endDate,
      targetAudience: JSON.parse(targetAudience),
      notifications: JSON.parse(notifications),
      image: imagePath, // Almacenar la ruta de la imagen
      user,
    });

    // Guardar la campaña en la base de datos
    await newCampaign.save();

    // Obtener todos los usuarios para enviarles notificaciones
    const users = await userModel.find({});

    // Enviar notificaciones a los usuarios
    await sendCampaignNotifications(newCampaign, users);

    res.status(201).json({
      success: true,
      message: "Campaña creada con éxito y notificaciones enviadas",
      campaign: newCampaign,
    });
  } catch (error) {
    console.error("Error al crear la campaña:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear la campaña",
      error: error.message,
    });
  }
};

// Obtener todas las campañas de marketing
export const getAllMarketingCampaignsController = async (req, res) => {
  try {
    const campaigns = await marketingCampaignModel.find({});
    res.status(200).send({
      success: true,
      message: "Todas las campañas de marketing",
      campaigns,
    });
  } catch (error) {
    console.error("Error al obtener las campañas de marketing:", error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las campañas de marketing",
      error: error.message,
    });
  }
};

// Obtener una campaña de marketing por ID
export const getSingleMarketingCampaignController = async (req, res) => {
  try {
    const campaign = await marketingCampaignModel.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send({
        success: false,
        message: "Campaña de marketing no encontrada",
      });
    }
    res.status(200).send({
      success: true,
      message: "Campaña de marketing encontrada",
      campaign,
    });
  } catch (error) {
    console.error("Error al obtener la campaña de marketing:", error);
    res.status(500).send({
      success: false,
      message: "Error al obtener la campaña de marketing",
      error: error.message,
    });
  }
};

// Obtener campañas de marketing por usuario
export const getMarketingCampaignsByUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const campaigns = await marketingCampaignModel.find({ user: userId });

    if (!campaigns || campaigns.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No se encontraron campañas de marketing para este usuario",
      });
    }

    res.status(200).send({
      success: true,
      message: "Campañas de marketing encontradas",
      campaigns,
    });
  } catch (error) {
    console.error("Error al obtener las campañas del usuario:", error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las campañas del usuario",
      error: error.message,
    });
  }
};

// Actualizar una campaña de marketing
export const updateMarketingCampaignController = async (req, res) => {
    try {
      const { title, description, startDate, endDate, targetAudience, notifications, status } = req.body;
  
      console.log("Título:", title, "Descripción:", description);
  
      // Verificar si se subió una nueva imagen
      let imagePath = null;
      if (req.file) {
        imagePath = req.file.path; // Nueva imagen
      }
  
      // Obtener la campaña existente
      const existingCampaign = await marketingCampaignModel.findById(req.params.id);
      if (!existingCampaign) {
        return res.status(404).send({
          success: false,
          message: "Campaña de marketing no encontrada",
        });
      }
  
      // Manejar los casos en que targetAudience o notifications sean undefined o nulos
      const parsedTargetAudience = targetAudience ? JSON.parse(targetAudience) : existingCampaign.targetAudience;
      const parsedNotifications = notifications ? JSON.parse(notifications) : existingCampaign.notifications;
  
      // Actualizar solo la imagen si hay una nueva, de lo contrario mantener la existente
      const updatedCampaign = await marketingCampaignModel.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          startDate,
          endDate,
          targetAudience: parsedTargetAudience,
          notifications: parsedNotifications,
          status,
          image: imagePath || existingCampaign.image, // Mantener la imagen existente si no hay una nueva
        },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Campaña de marketing actualizada correctamente",
        campaign: updatedCampaign,
      });
    } catch (error) {
      console.error("Error al actualizar la campaña de marketing:", error);
      res.status(500).send({
        success: false,
        message: "Error al actualizar la campaña de marketing",
        error: error.message,
      });
    }
  };
  
  

// Eliminar una campaña de marketing
export const deleteMarketingCampaignController = async (req, res) => {
  try {
    await marketingCampaignModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Campaña de marketing eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar la campaña de marketing:", error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar la campaña de marketing",
      error: error.message,
    });
  }
};
