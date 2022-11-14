import { Schema, model } from "mongoose";

let date = Date.now()
const barrilSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    clientId: {
      type: Number,
      required: false,
    },
    dateLeft: {
      type: Date,
      required: false,
    },
    dateReturn: {
      type: Date,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Barril = model("Barril", barrilSchema);
