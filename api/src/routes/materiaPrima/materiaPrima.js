import { Schema, model } from "mongoose";

const materiaPrimasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const MateriaPrima = model("MateriaPrima", materiaPrimasSchema);
