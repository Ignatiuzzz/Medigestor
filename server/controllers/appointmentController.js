import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";
import paymentModel from "../models/Pagos.js";
import Specialty from "../models/specialtyModel.js";

// Obtener citas que no tienen pagos asociados para el usuario autenticado
export const getAppointmentsWithoutPayment = async (req, res) => {
  try {
    const userId = req.user._id; // Usuario autenticado
    const appointments = await Appointment.find({ user: userId, status: "Completed" })
      .populate('doctor specialty');

    const payments = await paymentModel.find();

    const appointmentsWithoutPayment = appointments.filter(appointment => {
      return !payments.some(payment => payment.appointment.toString() === appointment._id.toString());
    });

    res.status(200).send({
      success: true,
      appointments: appointmentsWithoutPayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las citas sin pago",
      error: error.message,
    });
  }
};

// Crear una cita para el usuario autenticado
export const createAppointmentController = async (req, res) => {
  try {
    const {
      doctor,
      specialty,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
    } = req.body;

    if (!doctor || !specialty || !patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime || !reasonForVisit) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).send({ error: "Doctor not found" });
    }

    const specialtyExists = await Specialty.findById(specialty);
    if (!specialtyExists) {
      return res.status(404).send({ error: "Specialty not found" });
    }

    const newAppointment = new Appointment({
      doctor,
      specialty,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
      user: req.user._id, // Asignar al usuario autenticado
    });

    await newAppointment.save();

    res.status(201).send({
      success: true,
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error in createAppointmentController:", error);
    res.status(500).send({
      success: false,
      message: "Error creating appointment",
      error: error.message,
    });
  }
};

// Obtener todas las citas del usuario autenticado
export const getAllAppointmentsController = async (req, res) => {
  try {
    const userId = req.user._id; // Usuario autenticado
    const appointments = await Appointment.find({ user: userId })
      .populate("doctor", "name lastName")
      .populate("specialty", "name")
      .sort({ appointmentDate: -1 });

    res.status(200).send({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error in getAllAppointmentsController:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};

// Obtener una cita por ID para el usuario autenticado
export const getAppointmentByIdController = async (req, res) => {
  try {
    const userId = req.user._id;
    const appointment = await Appointment.findOne({ _id: req.params.id, user: userId })
      .populate("doctor", "name lastName")
      .populate("specialty", "name");

    if (!appointment) {
      return res.status(404).send({ success: false, message: "Appointment not found" });
    }

    res.status(200).send({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Error in getAppointmentByIdController:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching appointment",
      error: error.message,
    });
  }
};

// Actualizar una cita para el usuario autenticado
// Actualizar una cita para el usuario autenticado
export const updateAppointmentController = async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const updateData = req.body;
  
      // Encuentra la cita por ID
      const appointment = await Appointment.findById(appointmentId);
  
      // Si no se encuentra la cita, retorna un error
      if (!appointment) {
        return res.status(404).send({ success: false, message: "Appointment not found" });
      }
  
      // Actualiza los campos de la cita con los datos proporcionados
      Object.assign(appointment, updateData);
  
      // Guarda los cambios en la base de datos
      await appointment.save();
  
      res.status(200).send({
        success: true,
        message: "Appointment updated successfully",
        appointment,
      });
    } catch (error) {
      console.error("Error in updateAppointmentController:", error);
      res.status(500).send({
        success: false,
        message: "Error updating appointment",
        error: error.message,
      });
    }
  };
  
export const deleteAppointmentController = async (req, res) => {
    try {
      const userId = req.user._id; // Ensure req.user is populated correctly
      const appointmentId = req.params.id;
  
      // Debugging: Log the userId and appointmentId
      console.log(`User ID: ${userId}`);
      console.log(`Appointment ID: ${appointmentId}`);
  
      // Find the appointment by ID and the authenticated user
      const appointment = await Appointment.findOne({ _id: appointmentId, user: userId });
  
      if (!appointment) {
        return res.status(404).send({
          success: false,
          message: "Appointment not found or you don't have permission to delete it",
        });
      }
  
      // If the appointment exists and belongs to the user, delete it
      await Appointment.findByIdAndDelete(appointmentId);
  
      res.status(200).send({
        success: true,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteAppointmentController:", error);
  
      // Send more detailed error response
      res.status(500).send({
        success: false,
        message: "Error deleting appointment",
        error: error.message, // Include error message in the response
      });
    }
  };
  
// Controller to get all appointments for the current user
export const getAppointmentsForCurrentUser = async (req, res) => {
    try {
      // Filtrar las citas por el usuario actual en la sesión
      const userId = req.user._id; // Asegúrate de que req.user contenga la información del usuario autenticado
      const appointments = await Appointment.find({ user: userId })
        .populate("doctor", "name lastName")
        .populate("specialty", "name")
        .sort({ appointmentDate: -1 });
  
      res.status(200).send({
        success: true,
        appointments,
      });
    } catch (error) {
      console.error("Error in getAppointmentsForCurrentUser:", error);
      res.status(500).send({
        success: false,
        message: "Error fetching appointments",
        error: error.message,
      });
    }
  };
  // Obtener todas las citas sin ningún filtro
  export const getAllAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find({})
        .populate("doctor", "name lastName")
        .populate("specialty", "name")
        .populate({ path: "user", model: "users", select: "name email" }) // Specify the correct model name: 'users'
        .sort({ appointmentDate: -1 });
  
      res.status(200).send({
        success: true,
        appointments,
      });
    } catch (error) {
      console.error("Error in getAllAppointments:", error);
      res.status(500).send({
        success: false,
        message: "Error fetching appointments",
        error: error.message,
      });
    }
  };
  // Delete an appointment by its ID
export const deleteAppointment = async (req, res) => {
    try {
      const appointmentId = req.params.id;
  
      // Find and delete the appointment by its ID
      const appointment = await Appointment.findByIdAndDelete(appointmentId);
  
      if (!appointment) {
        return res.status(404).send({
          success: false,
          message: "Appointment not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteAppointment:", error);
      res.status(500).send({
        success: false,
        message: "Error deleting appointment",
        error: error.message,
      });
    }
  };

  