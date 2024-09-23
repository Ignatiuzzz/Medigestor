import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import appointmentRoutes from "./routes/appointmentRoutes.js"; // Importing the appointment routes
import authRoutes from "./routes/authRoute.js";
import doctorRoutes from "./routes/doctorRoutes.js"; // Importing the doctor routes
import specialtyRoutes from "./routes/specialtyRoutes.js"; // Importing the specialty routes
import users from "./routes/usersRoutes.js";
import aseguradoras from "./routes/aseguradorasRoute.js";
import pagos from "./routes/pagosRoute.js";
import facturacion from "./routes/facturacionRoute.js";
import marketing from "./routes/marketingCampaignRoutes.js";
import path from 'path'
import startCronJobs from './cronJobs.js';

// Configure environment variables
dotenv.config();

// Database connection
connectDB();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", users);
app.use("/api/v1/specialty", specialtyRoutes); // Specialty routes
app.use("/api/v1/doctor", doctorRoutes); // Doctor routes
app.use("/api/v1/appointment", appointmentRoutes); // Appointment routes
app.use("/api/v1/issuer", aseguradoras);
app.use("/api/v1/payment", pagos);
app.use("/api/v1/invoice", facturacion);
app.use("/api/v1/campaigns", marketing);
const __dirname = path.resolve(); // Obtén la ruta absoluta del directorio actual
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Configura la ruta para servir archivos estáticos
// Test route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Medigestor</h1>");
});

// Iniciar los cron jobs
startCronJobs();

// PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
