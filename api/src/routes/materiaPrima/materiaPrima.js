import { Schema, model } from "mongoose";

const materiaPrimasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    //  Amount of bags/cans:
    amount: {
      type: Number,
      required: true,
    },
    //  Size of those bags/cans:
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
