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
    const fermentador = await Fermentador.find({ name });
    res.status(201).json(fermentador);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
export const putFermentador = async (req, res) => {
  const { name } = req.params;
  const { isInUse } = req.body
  console.log(name);
  console.log(isInUse);
  try {
    if (!name) {
      throw { status: 404, message: "Se necesita un nombre de fermentador" };
    }
    const fermentador = await Fermentador.findOneAndUpdate( { name }, { isInUse }, {new: true});
    console.log(fermentador);
    if (!fermentador ) {
      throw {
        status: 404,
        message: `El fermentador con el nombre: ${name}, no existe`,
      };
    }
    res.status(201).json(fermentador);
  } catch (error) {
    res.status(error.status || 403).send(error.message);
  }
};
