import { Fermentador } from "./fermentador.js";

export const createFermentador = async (req, res) => {
  try {
    const fermentador = await Fermentador.create({ name: "CervezaIPA", amount: "111" });
    res.status(201).json(fermentador);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
