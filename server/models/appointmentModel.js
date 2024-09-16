import mongoose from "mongoose";

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Reference to the Doctor model
    required: true,
  },
  specialty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialty", // Reference to the Specialty model
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  reasonForVisit: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Asegúrate de tener un modelo de "User"
    required: true,
  },
});

// Export the appointment model
export default mongoose.model("Appointment", appointmentSchema);
