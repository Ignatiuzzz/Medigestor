import slugify from "slugify";
import specialtyModel from "../models/specialtyModel.js";

// Crear nueva especialidad médica
export const createSpecialtyController = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(401).send({ message: "Nombre y descripción son requeridos" });
    }
    const existingSpecialty = await specialtyModel.findOne({ name });
    if (existingSpecialty) {
      return res.status(200).send({
        success: false,
        message: "Especialidad ya existe",
      });
    }
    const specialty = await new specialtyModel({
      name,
      description,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Nueva especialidad creada",
      specialty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al crear especialidad",
    });
  }
};

// Actualizar especialidad médica
export const updateSpecialtyController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const specialty = await specialtyModel.findByIdAndUpdate(
      id,
      { name, description, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Especialidad actualizada correctamente",
      specialty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al actualizar especialidad",
    });
  }
};

// Obtener todas las especialidades médicas
export const getAllSpecialtiesController = async (req, res) => {
  try {
    const specialties = await specialtyModel.find({});
    res.status(200).send({
      success: true,
      message: "Todas las especialidades",
      specialties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al obtener todas las especialidades",
    });
  }
};

// Obtener una sola especialidad médica
export const getSingleSpecialtyController = async (req, res) => {
  try {
    const specialty = await specialtyModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Especialidad obtenida",
      specialty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al obtener especialidad",
    });
  }
};

// Eliminar especialidad médica
export const deleteSpecialtyController = async (req, res) => {
  try {
    const { id } = req.params;
    await specialtyModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Especialidad eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar especialidad",
      error,
    });
  }
};
