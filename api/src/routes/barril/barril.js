import { Schema, model } from "mongoose";

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

export const Barril = model("Barril", barrilSchema);
