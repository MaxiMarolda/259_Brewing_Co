import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    group: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: false,
      default: 0,
    },
    groupStage: {
      gf: {
        type: Number,
        default: 0,
      },
      gc: {
        type: Number,
        default: 0,
      },
      position: {
        type: String,
        default: undefined,
      },
    },
    round16: {
      type: String,
      default: null,
    },
    quarterfinals: {
      type: String,
      default: null,
    },
    semifinals: {
      type: String,
      default: null,
    },
    final: {
      type: String,
      default: null,
    },
    champion: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Team = model("Team", teamSchema);
