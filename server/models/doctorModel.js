import mongoose from "mongoose";

// Definición del esquema de doctor
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialty", // Relación con el modelo Specialty
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  clinicAddress: {
    type: String,
    required: true,
  },
});

// Exportación del modelo de doctor
export default mongoose.model("Doctor", doctorSchema);
