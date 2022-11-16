import { Receta } from "./receta.js";
import { MateriaPrima } from "../materiaPrima/materiaPrima.js";

export const getReceta = async (req, res) => {
  const allReceta = await Receta.find();

  res.status(200).json(allReceta);
};

export const createReceta = async (req, res) => {
  try {
    //  name y type son propiedades de materia prima, el resto de la receta en sí
    const { name, type, ingredients } = req.body;

    //  Validar los _id de cada ingrediente
    const allIngredients = await MateriaPrima.find();

    const receta = await Receta.create({ name, type, ingredients });

    res.status(201).json(receta);
  } catch (error) {
    if (error.code === 11000) return res.status(400).send("Duplicated key: " + JSON.stringify(error.keyValue));

    res.status(400).send(error.message);
  }
};
