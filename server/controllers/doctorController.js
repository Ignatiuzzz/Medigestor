import doctorModel from "../models/doctorModel.js";

// Controller to create a new doctor
export const createDoctorController = async (req, res) => {
  try {
    const { name, lastName, email, phone, specialty, yearsOfExperience, clinicAddress } = req.body;

    // Validations
    if (!name) return res.status(400).send({ error: "Doctor's name is required" });
    if (!lastName) return res.status(400).send({ error: "Doctor's last name is required" });
    if (!email) return res.status(400).send({ error: "Doctor's email is required" });
    if (!phone) return res.status(400).send({ error: "Doctor's phone is required" });
    if (!specialty) return res.status(400).send({ error: "Specialty is required" });
    if (!yearsOfExperience) return res.status(400).send({ error: "Years of experience are required" });
    if (!clinicAddress) return res.status(400).send({ error: "Clinic address is required" });

    const doctor = new doctorModel({
      name,
      lastName,
      email,
      phone,
      specialty,
      yearsOfExperience,
      clinicAddress,
    });

    await doctor.save();
    res.status(201).send({
      success: true,
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error in createDoctorController:", error);
    res.status(500).send({
      success: false,
      message: "Error creating doctor",
      error: error.message,
    });
  }
};

// Controller to get all doctors
// Modificar getDoctorsController para aceptar filtro por especialidad
export const getDoctorsController = async (req, res) => {
  try {
    const { specialty } = req.query; // Tomar el parámetro de la especialidad de la consulta
    const filter = specialty ? { specialty } : {};
    
    const doctors = await doctorModel.find(filter).populate("specialty").sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "List of all doctors",
      doctors,
    });
  } catch (error) {
    console.error("Error in getDoctorsController:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching doctors",
      error: error.message,
    });
  }
};


// Controller to get a single doctor by ID
export const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id).populate("specialty");

    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor not found" });
    }

    res.status(200).send({
      success: true,
      message: "Doctor details fetched successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error in getDoctorByIdController:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching doctor details",
      error: error.message,
    });
  }
};

// Controller to update doctor information
export const updateDoctorController = async (req, res) => {
  try {
    const { name, lastName, email, phone, specialty, yearsOfExperience, clinicAddress } = req.body;

    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor not found" });
    }

    doctor.name = name || doctor.name;
    doctor.lastName = lastName || doctor.lastName;
    doctor.email = email || doctor.email;
    doctor.phone = phone || doctor.phone;
    doctor.specialty = specialty || doctor.specialty;
    doctor.yearsOfExperience = yearsOfExperience || doctor.yearsOfExperience;
    doctor.clinicAddress = clinicAddress || doctor.clinicAddress;

    await doctor.save();

    res.status(200).send({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error in updateDoctorController:", error);
    res.status(500).send({
      success: false,
      message: "Error updating doctor",
      error: error.message,
    });
  }
};

// Controller to delete a doctor
export const deleteDoctorController = async (req, res) => {
  try {
    await doctorModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteDoctorController:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting doctor",
      error: error.message,
    });
  }
};

