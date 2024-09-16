import mongoose from "mongoose";

const insurerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // Lista de precios de servicios médicos cubiertos por la aseguradora
    pricing: [
      {
        service: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    // Tipos de pólizas ofrecidas por la aseguradora
    policies: [
      {
        policyType: {
          type: String,
          required: true,
        },
        coverage: {
          type: String,
          required: true,
        },
        premium: {
          type: Number,
          required: true,
        },
      },
    ],
   
    
  },
  { timestamps: true }
);

export default mongoose.model("insurers", insurerSchema);
