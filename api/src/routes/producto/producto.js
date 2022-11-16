import { Schema, model } from "mongoose";


const productoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    presentationId: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Producto = model("Producto", productoSchema);
