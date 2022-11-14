import { Schema, model } from "mongoose";

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
      type: TimeRanges,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Fermentador = model("Fermentador", fermentadorSchema);
