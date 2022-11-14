import { Barril } from "./barril.js";

export const createbarril = async (req, res) => {
  try {
    const {
     type
    } = req.body;
    const barril = await barril.create({ type });
    res.status(201).json(barril);
  } catch (error) {
    res.status(400).send(error.message);
  }
};