import { MateriaPrima } from "./materiaPrima.js";

const types = ["production", "package"];

const createOrUpdateMateriaPrima = async (newMateriaPrima) => {
  const materiasPrimas = await MateriaPrima.find();
  const alreadyExists = materiasPrimas.find(
    (materiaPrima) =>
      materiaPrima.name === newMateriaPrima.name &&
      materiaPrima.type === newMateriaPrima.type &&
      materiaPrima.size === newMateriaPrima.size
  );

  if (alreadyExists) {
    return await MateriaPrima.findByIdAndUpdate(
      alreadyExists._id,
      { amount: alreadyExists.amount + newMateriaPrima.amount },
      { new: true }
    );
  } else {
    return await MateriaPrima.create(newMateriaPrima);
  }
};

export const createMateriaPrima = async (req, res) => {
  try {
    const { name, amount, type, size, many } = req.body;

    //  Create many MateriaPrima:
    if (many?.length) {
      const allNewMateriaPrima = [];

      for (let i = 0; i < many.length; i++) {
        allNewMateriaPrima.push(await createOrUpdateMateriaPrima(many[i]));
      }
      return res.status(201).json(allNewMateriaPrima);
    }

    //  Create one MateriaPrima:
    const materiaPrima = await createOrUpdateMateriaPrima({ name, type, amount, size });
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

// props that can be updated: name, type, amount
export const updateMateriaPrima = async (req, res) => {
  const newProps = req.body;
  const { id } = req.params;
  try {
    if (!newProps["name"] && !newProps["type"] && !newProps["amount"]) {
      throw { status: 400, message: "Only name, type or amount can be updated" };
    }
    const newMateriaPrima = await MateriaPrima.findByIdAndUpdate(id, newProps, { new: true });

    res.status(201).json(newMateriaPrima);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteMateriaPrima = async (req, res) => {
  try {
    const { id } = req.params;
    const materiaPrimaToDelete = await MateriaPrima.findByIdAndDelete(id);

    res.status(202).json(materiaPrimaToDelete);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
