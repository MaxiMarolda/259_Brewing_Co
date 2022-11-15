import { Producto } from "./producto.js";

export const createProducto = async (req, res) => {
  try {
    const {
     name,
     price,
     presentationId,
     isActive
    } = req.body;
    const producto = await Producto.create({ name, price, presentationId, isActive });
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getAllProducto = async (req, res) => {
  try {
    const producto = await Producto.find();
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getProducto = async (req, res) => {
  try {
    const { _id } = req.params;
    const producto = await Producto.find({ _id });
    res.status(201).json(producto);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
export const putProducto = async (req, res) => {
  const { _id } = req.params;
  const { price } = req.body;
  try {
    if (!_id) {
      throw { status: 404, message: "Se necesita un ID de producto" };
    }
    const producto = await Producto.findByIdAndUpdate( { _id }, { price }, {new: true})
    if (!producto ) {
      throw {
        status: 404,
        message: `El producto con el ID: ${_id}, no existe`,
      };
    }
    res.status(201).json(producto);
  } catch (error) {
    res.status(error.status || 403).send(error.message);
  }
};