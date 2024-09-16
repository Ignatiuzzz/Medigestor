import dotenv from "dotenv";
import insurerModel from "../models/Aseguradoras.js"; // Asegúrate de que el nombre y la ruta del modelo sean correctos

dotenv.config();

// Crear una nueva aseguradora
export const createInsurerController = async (req, res) => {
  try {
    const { name, email, phone, address, pricing, policies } = req.body;

    // Validación
    if (!name || !email || !phone || !address || !pricing || !policies) {
      return res.status(400).send({ error: "Todos los campos son requeridos" });
    }

    const insurer = new insurerModel({
      name,
      email,
      phone,
      address,
      pricing,
      policies,
    });

    await insurer.save();
    res.status(201).send({
      success: true,
      message: "Aseguradora creada exitosamente",
      insurer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al crear la aseguradora",
      error: error.message,
    });
  }
};

// Obtener todas las aseguradoras
export const getAllInsurersController = async (req, res) => {
  try {
    const insurers = await insurerModel.find({});
    res.status(200).send({
      success: true,
      message: "Todas las aseguradoras",
      insurers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las aseguradoras",
      error: error.message,
    });
  }
};

// Obtener aseguradora por ID
export const getSingleInsurerController = async (req, res) => {
  try {
    const insurer = await insurerModel.findById(req.params.id);
    if (!insurer) {
      return res.status(404).send({
        success: false,
        message: "Aseguradora no encontrada",
      });
    }
    res.status(200).send({
      success: true,
      message: "Aseguradora encontrada",
      insurer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener la aseguradora",
      error: error.message,
    });
  }
};

// Actualizar aseguradora
export const updateInsurerController = async (req, res) => {
  try {
    const { name, email, phone, address, pricing, policies } = req.body;
    const insurer = await insurerModel.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, pricing, policies },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Aseguradora actualizada correctamente",
      insurer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al actualizar la aseguradora",
      error: error.message,
    });
  }
};

// Eliminar aseguradora
export const deleteInsurerController = async (req, res) => {
  try {
    await insurerModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Aseguradora eliminada exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar la aseguradora",
      error: error.message,
    });
  }
};
