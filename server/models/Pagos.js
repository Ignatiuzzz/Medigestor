import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Referencia a la aseguradora o clínica que genera el cobro
    issuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "insurers", // Puede ser la colección de aseguradoras o clínicas
      required: true,
    },
    // Referencia al paciente o cliente que está realizando el pago
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Puede ser la colección de usuarios/pacientes
      required: true,
    },
    // Descripción del servicio médico o tratamiento cubierto por el pago
    service: {
      type: String,
      required: true,
    },
    // Referencia a la cita asociada con este pago
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments", // Referencia a la colección de citas
      required: true,
    },
    // Monto total del pago
    amount: {
      type: Number,
      required: true,
    },
    // Estado del pago (pagado, pendiente, cancelado)
    status: {
      type: String,
      enum: ["pagado", "pendiente", "cancelado"],
      default: "pendiente",
      required: true,
    },
    // Método de pago (tarjeta, transferencia, efectivo, etc.)
    paymentMethod: {
      type: String,
      enum: ["tarjeta", "transferencia", "efectivo"],
      required: true,
    },
    // Fecha de emisión de la factura
    issueDate: {
      type: Date,
      default: Date.now,
    },
    // Fecha de vencimiento del pago (opcional si aplica)
    dueDate: {
      type: Date,
    },
    // Referencia a la factura asociada con este pago
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "invoices", // Referencia a la colección de facturas
    },
    // Campo para comentarios adicionales sobre el pago
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("payments", paymentSchema);
