import { MateriaPrima } from "./materiaPrima.js";

const types = ["production", "package"];

export const createMateriaPrima = async (req, res) => {
  try {
    const { name, amount, type, size } = req.body;
    if (!types.includes(type)) {
      throw { message: "Invalid type" };
    }

    const materiaPrima = await MateriaPrima.create({ name, amount, type, size });
    res.status(201).json(materiaPrima);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllMateriasPrimas = async (req, res) => {
  const materiasPrimas = await MateriaPrima.find();
  res.status(201).json(materiasPrimas);
};

export const getMateriaPrima = async (req, res) => {
  try {
    const { type } = req.params;

    if (!types.includes(type)) {
      const materiasPrimas = await MateriaPrima.find();
      return res.status(201).json(materiasPrimas);
    }

    const materiaPrima = await MateriaPrima.find({ type });
    res.status(201).json(materiaPrima);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateMateriaPrima = async (req, res) => {
  const newProps = req.body;
  const { name } = req.params;
  try {
    const newMateriaPrima = await MateriaPrima.findOneAndUpdate(name, newProps, { new: true });

    res.status(201).json(newMateriaPrima);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
