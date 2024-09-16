import invoiceModel from "../models/Facturacion.js";
import customerModel from "../models/userModel.js"; // Modelo de cliente (asegúrate de tener el correcto)
import paymentModel from "../models/appointmentModel.js"; // Modelo de pago (asegúrate de tener el correcto)
import fs from 'fs';
import path, { dirname } from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtener todas las facturas por ID de usuario
export const getInvoicesByUserController = async (req, res) => {
  try {
    const { userId } = req.params;  // Obtener el ID del usuario de los parámetros de la URL

    // Buscar las facturas que coincidan con el ID del usuario
    const invoices = await invoiceModel.find({ customer: userId }).populate("payment").populate("customer");

    // Si no se encuentran facturas, responder con un mensaje
    if (!invoices || invoices.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No se encontraron facturas para este usuario",
      });
    }

    // Si se encuentran facturas, responder con éxito y los datos de las facturas
    res.status(200).send({
      success: true,
      message: "Facturas encontradas",
      invoices,
    });
  } catch (error) {
    console.error("Error al obtener las facturas del usuario:", error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las facturas del usuario",
      error: error.message,
    });
  }
};

// Crear y generar el archivo PDF para la factura
export const generateInvoicePDF = async (invoiceData) => {
  try {
    const { invoiceNumber, totalAmount, customer: customerId, payment: paymentId } = invoiceData;

    // Obtener los datos completos de customer y payment usando populate
    const customer = await customerModel.findById(customerId);
    const payment = await paymentModel.findById(paymentId); // Si el pago tiene una referencia a appointment

    if (!customer || !payment) {
      throw new Error("Datos de cliente o pago no encontrados");
    }
    console.log(payment);

    const doc = new PDFDocument();
    const uploadsDir = path.join(__dirname, '../uploads');

    // Verificar que el directorio de uploads exista, si no, crearlo
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, `${invoiceNumber}.pdf`);

    // Crear un flujo de escritura
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Título de la factura
    doc.fontSize(20).text("Factura de Medigestor", { align: 'center' });
    
    // Información del cliente
    doc.fontSize(12).text(`Factura No: ${invoiceNumber}`, { align: 'left' });
    doc.fontSize(12).text(`Cliente: ${payment.patientName}`, { align: 'left' });
    doc.fontSize(12).text(`Servicio: ${payment.reasonForVisit}`, { align: 'left' }); // Servicio relacionado con el pago

    // Monto total
    doc.fontSize(14).text(`Monto Total: $${totalAmount}`, { align: 'left' });

    // Información de la empresa
    doc.text("\n\n");
    doc.text("Medigestor S.A.", { align: 'center' });
    doc.text("Calle 123, Ciudad", { align: 'center' });
    doc.text("Tel: 123-456-7890", { align: 'center' });

    // Finalizar la escritura
    doc.end();

    // Retornar la ruta del archivo PDF generado
    return filePath;
  } catch (error) {
    console.error("Error al generar el PDF de la factura:", error);
    throw new Error("Error al generar el PDF de la factura.");
  }
};

// Otros controladores aquí...

// Crear una nueva factura
export const createInvoiceController = async (req, res) => {
    try {
      const { totalAmount, customer, payment, status, issueDate } = req.body;
  
      // Validaciones adicionales
      if (!totalAmount || isNaN(totalAmount)) {
        return res.status(400).send({ error: "El monto total es requerido y debe ser un número válido" });
      }
      if (!customer) {
        return res.status(400).send({ error: "ID del cliente es requerido" });
      }
      if (!payment) {
        return res.status(400).send({ error: "ID del pago es requerido" });
      }
  
      // Buscar la última factura generada
      const lastInvoice = await invoiceModel.findOne().sort({ invoiceNumber: -1 });
  
      // Generar un nuevo número de factura único
      let invoiceNumber;
      if (lastInvoice) {
        invoiceNumber = (parseInt(lastInvoice.invoiceNumber) + 1).toString();
      } else {
        invoiceNumber = "1000"; // Número de factura inicial si no hay facturas
      }
  
      // Crear la factura en la base de datos
      const newInvoice = new invoiceModel({
        invoiceNumber,
        payment,
        customer,
        totalAmount,
        issueDate,
        status,
      });
  
      await newInvoice.save();
  
      // Generar el PDF de la factura
      const filePath = await generateInvoicePDF(newInvoice);
  
      // Guardar la ruta del PDF en la factura
      newInvoice.invoiceFile = filePath;
      await newInvoice.save();
  
      res.status(201).send({
        success: true,
        message: "Factura creada y PDF generado exitosamente",
        invoice: newInvoice,
      });
    } catch (error) {
      console.log("Error al crear la factura:", error);
      res.status(500).send({
        success: false,
        message: "Error al crear la factura",
        error: error.message,
      });
    }
  };
  
  
// Obtener todas las facturas
export const getAllInvoicesController = async (req, res) => {
  try {
    const invoices = await invoiceModel.find({}).populate("payment").populate("customer");
    res.status(200).send({
      success: true,
      message: "Todas las facturas",
      invoices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las facturas",
      error: error.message,
    });
  }
};

// Obtener una factura por ID
export const getSingleInvoiceController = async (req, res) => {
  try {
    const invoice = await invoiceModel.findById(req.params.id).populate("payment").populate("customer");
    if (!invoice) {
      return res.status(404).send({
        success: false,
        message: "Factura no encontrada",
      });
    }
    res.status(200).send({
      success: true,
      message: "Factura encontrada",
      invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener la factura",
      error: error.message,
    });
  }
};

// Actualizar una factura
export const updateInvoiceController = async (req, res) => {
  try {
    const { invoiceNumber, payment, customer, totalAmount, dueDate, invoiceFile, status } = req.body;
    const invoice = await invoiceModel.findByIdAndUpdate(
      req.params.id,
      { invoiceNumber, payment, customer, totalAmount, dueDate, invoiceFile, status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Factura actualizada correctamente",
      invoice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al actualizar la factura",
      error: error.message,
    });
  }
};

// Eliminar una factura
export const deleteInvoiceController = async (req, res) => {
  try {
    await invoiceModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Factura eliminada exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar la factura",
      error: error.message,
    });
  }
};
