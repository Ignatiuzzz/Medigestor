import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    // Número de factura único
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    // Referencia al pago asociado con esta factura
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    // Referencia al cliente/paciente al que se le emitió la factura
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // Total facturado
    totalAmount: {
      type: Number,
      required: true,
    },
    // Fecha de emisión de la factura
    issueDate: {
      type: Date,
      default: Date.now,
    },
   
    // Estado de la factura (emitida, pagada, vencida, cancelada)
    status: {
      type: String,
      enum: ["emitida", "pagada", "vencida", "cancelada"],
      default: "emitida",
      required: true,
    },
   
    
  },
  { timestamps: true }
);

export default mongoose.model("invoices", invoiceSchema);
