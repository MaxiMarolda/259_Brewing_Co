import { Barril } from "./barril.js";

export const createBarril = async (req, res) => {
  try {
    const {
     type
    } = req.body;
    const barril = await Barril.create({ type });
    res.status(201).json(barril);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getAllBarril = async (req, res) => {
  try {
    const barril = await Barril.find();
    res.status(200).json(barril);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getBarril = async (req, res) => {
  try {
    const { name } = req.params;
    const barril = await Barril.find({ _id });
    res.status(201).json(barril);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
export const putBarril = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  const { update } = req.body;
  try {
    if (!_id) {
      throw { status: 404, message: "Se necesita un ID de barril" };
    }
    const barril = update === "In" 
    ? await Barril.findOneAndUpdate( { _id }, { dateReturn: Date.now() }, {new: true})
    : await Barril.findOneAndUpdate( { _id }, { dateLeft: Date.now() }, {new: true});
    console.log(barril);
    if (!barril ) {
      throw {
        status: 404,
        message: `El barril con el ID: ${_id}, no existe`,
      };
    }
    res.status(201).json(barril);
  } catch (error) {
    res.status(error.status || 403).send(error.message);
  }
};