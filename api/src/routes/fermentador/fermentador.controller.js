import { Fermentador } from "./fermentador.js";

export const createFermentador = async (req, res) => {
  try {
    const {
      name,
      isInUse,
      volume,
    } = req.body;
    const fermentador = await Fermentador.create({ name, isInUse, volume });
    res.status(201).json(fermentador);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
