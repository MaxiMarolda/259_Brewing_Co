import { Schema, model } from "mongoose";

let date = Date.now()
const fermentadorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    isInUse: {
      type: Boolean,
      required: true,
    },
    dateBusy: {
      type: Date,
      required: false,
      default: date
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Fermentador = model("Fermentador", fermentadorSchema);
