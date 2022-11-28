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

    //  Validar los ingredientes
    const allIngredients = await MateriaPrima.find();

    ingredients.forEach((ingredient) => {
      let found = allIngredients.find(
        (materiaPrima) => materiaPrima.name === ingredient.name && materiaPrima.type === ingredient.type
      );
      if (!found) {
        throw { status: 400, message: "Ingredient doesn't exists" };
      }
    });

    //  Crear receta
    const receta = await Receta.create({ name, type, ingredients });

    res.status(201).json(receta);
  } catch (error) {
    if (error.code === 11000) return res.status(400).send("Duplicated key: " + JSON.stringify(error.keyValue));

    res.status(400).send(error.message);
  }
};

export const updateReceta = (req, res) => {
  const { name, type, ingredients } = req.body;
};
