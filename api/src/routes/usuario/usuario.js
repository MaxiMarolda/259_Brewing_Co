import { Schema, model } from "mongoose";

let date = Date.now()
const usuarioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: date
    },
    phone: {
      type: Number,
      required: true,
      default: date
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Usuario = model("Usuario", usuarioSchema);
