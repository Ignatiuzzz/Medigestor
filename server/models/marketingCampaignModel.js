import mongoose from "mongoose";

// Definición del esquema de campaña de marketing
const marketingCampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Título de la campaña
    },
    description: {
      type: String,
      required: true, // Descripción detallada de la campaña
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true, // El usuario que creó la campaña (puede ser un médico, administrador, etc.)
    },
    image: {
      data: Buffer,
      contentType: String,
      required: false, // Imagen opcional para la campaña (ej: banner)
    },
    startDate: {
      type: Date,
      required: true, // Fecha de inicio de la campaña
    },
    endDate: {
      type: Date,
      required: true, // Fecha de fin de la campaña
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "inactive", // Estado de la campaña: activa, inactiva, o completada
    },
    targetAudience: {
      type: [String],
      required: true, // Público objetivo (puede ser médicos, pacientes, aseguradoras, etc.)
    },
    notifications: {
      email: {
        type: Boolean,
        default: true, // Si la campaña enviará notificaciones por email
      },
      sms: {
        type: Boolean,
        default: false, // Si la campaña enviará notificaciones por SMS
      },
      whatsapp: {
        type: Boolean,
        default: false, // Si la campaña enviará notificaciones por WhatsApp
      },
    },
    
  },
  { timestamps: true }
);

// Exportación del modelo de campaña de marketing
export default mongoose.model("MarketingCampaign", marketingCampaignSchema);
