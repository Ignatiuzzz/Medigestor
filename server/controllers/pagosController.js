import paymentModel from "../models/Pagos.js";

// Crear un nuevo pago
export const createPaymentController = async (req, res) => {
  try {
    const { issuer, customer, service, appointment, amount, paymentMethod, dueDate, invoice, notes } = req.body;

    // Validación
    if (!issuer || !customer || !service || !appointment || !amount || !paymentMethod) {
      return res.status(400).send({ error: "Todos los campos son requeridos" });
    }

    const payment = new paymentModel({
      issuer,
      customer,
      service,
      appointment,
      amount,
      paymentMethod,
      dueDate,
      invoice,
      notes,
    });

    await payment.save();
    res.status(201).send({
      success: true,
      message: "Pago creado exitosamente",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al crear el pago",
      error: error.message,
    });
  }
};

// Obtener todos los pagos
export const getAllPaymentsController = async (req, res) => {
  try {
    // Prueba sin populates o con menos para depurar
    const payments = await paymentModel.find({}).populate("customer"); // Empieza populando solo "customer"
    
    res.status(200).send({
      success: true,
      message: "Todos los pagos",
      payments,
    });
  } catch (error) {
    console.log("Error al obtener los pagos:", error);
    res.status(500).send({
      success: false,
      message: "Error al obtener los pagos",
      error: error.message,
    });
  }
};


// Obtener un pago por ID
export const getSinglePaymentController = async (req, res) => {
  try {
    const payment = await paymentModel
      .findById(req.params.id)
      .populate("issuer")
      .populate("customer")
      .populate("invoice")
      .populate("appointment"); // Poblamos la cita asociada
    if (!payment) {
      return res.status(404).send({
        success: false,
        message: "Pago no encontrado",
      });
    }
    res.status(200).send({
      success: true,
      message: "Pago encontrado",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener el pago",
      error: error.message,
    });
  }
};

// Actualizar un pago
export const updatePaymentController = async (req, res) => {
  try {
    const { issuer, customer, service, appointment, amount, paymentMethod, dueDate, invoice, notes, status } = req.body;
    const payment = await paymentModel.findByIdAndUpdate(
      req.params.id,
      { issuer, customer, service, appointment, amount, paymentMethod, dueDate, invoice, notes, status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Pago actualizado correctamente",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al actualizar el pago",
      error: error.message,
    });
  }
};

// Eliminar un pago
export const deletePaymentController = async (req, res) => {
  try {
    await paymentModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Pago eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar el pago",
      error: error.message,
    });
  }
};
