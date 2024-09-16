import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";
import Specialty from "../models/specialtyModel.js";
import paymentModel from "../models/Pagos.js";

// Obtener citas que no tienen pagos asociados
export const getAppointmentsWithoutPayment = async (req, res) => {
  try {
    // Obtener todas las citas que tienen estado 'Completed' (o puedes ajustar según sea necesario)
    const appointments = await Appointment.find({ status: "Completed" }).populate('doctor specialty');

    // Obtener los pagos que ya están registrados
    const payments = await paymentModel.find();

    // Filtrar citas que no están asociadas a ningún pago
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

// Controller to create an appointment
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

    // Validate required fields
    if (!doctor || !specialty || !patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime || !reasonForVisit) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).send({ error: "Doctor not found" });
    }

    // Check if specialty exists
    const specialtyExists = await Specialty.findById(specialty);
    if (!specialtyExists) {
      return res.status(404).send({ error: "Specialty not found" });
    }

    // Create the appointment
    const newAppointment = new Appointment({
      doctor,
      specialty,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
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

// Controller to get all appointments
export const getAllAppointmentsController = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
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

// Controller to get a single appointment by ID
export const getAppointmentByIdController = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
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

// Controller to update an appointment
export const updateAppointmentController = async (req, res) => {
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
      status,
    } = req.body;

    // Find the appointment
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send({ success: false, message: "Appointment not found" });
    }

    // Update the fields
    appointment.doctor = doctor || appointment.doctor;
    appointment.specialty = specialty || appointment.specialty;
    appointment.patientName = patientName || appointment.patientName;
    appointment.patientEmail = patientEmail || appointment.patientEmail;
    appointment.patientPhone = patientPhone || appointment.patientPhone;
    appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
    appointment.appointmentTime = appointmentTime || appointment.appointmentTime;
    appointment.reasonForVisit = reasonForVisit || appointment.reasonForVisit;
    appointment.status = status || appointment.status;

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

// Controller to delete an appointment
export const deleteAppointmentController = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).send({ success: false, message: "Appointment not found" });
    }

    res.status(200).send({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAppointmentController:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting appointment",
      error: error.message,
    });
  }
};

