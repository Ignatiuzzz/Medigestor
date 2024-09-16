import mongoose from "mongoose";

// Definición del esquema de especialidad médica
const specialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Exportación del modelo de especialidad médica
export default mongoose.model("Specialty", specialtySchema);
