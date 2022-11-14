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
export const getAllFermentador = async (req, res) => {
  try {
    const fermentador = await Fermentador.find();
    res.status(200).json(fermentador);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getFermentador = async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    const fermentador = await Fermentador.find({ name });
    res.status(201).json(fermentador);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
