import { MateriaPrima } from "./materiaPrima.js";

export const createMateriaPrima = async (req, res) => {
  try {
    const materiaPrima = await MateriaPrima.create({ name: "Agua", amount: "100" });
    res.status(201).json(materiaPrima);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
