import { Schema, model } from "mongoose";

const materiaPrimasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const MateriaPrima = model("MateriaPrima", materiaPrimasSchema);
