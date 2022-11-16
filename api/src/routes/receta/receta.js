import { Schema, model } from "mongoose";

const recetaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: [
    {
      _id: {
        type: String,
        required: true,
      },
      grs: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Receta = model("Receta", recetaSchema);
