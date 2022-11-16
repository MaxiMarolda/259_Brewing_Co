import { Usuario } from "./usuario.js";

export const createUsuario = async (req, res) => {
  try {
    const {
      name,
      email,
      profile,
      isActive,
      phone
    } = req.body;
    const usuario = await Usuario.create({ name, email, profile, isActive, phone });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getAllUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.find();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getUsuario = async (req, res) => {
  try {
    const { email } = req.params;
    const usuario = await Usuario.find({ email });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(403).send(error.message);
  }
};
export const putUsuario = async (req, res) => {
  const { email } = req.params;
  const { isInUse } = req.body;
  try {
    if (!email) {
      throw { status: 404, message: "Se necesita un nombre de usuario" };
    }
    const usuario = await Usuario.findOneAndUpdate( { email }, { isInUse }, {new: true});
    console.log(usuario);
    if (!usuario ) {
      throw {
        status: 404,
        message: `El usuario con el nombre: ${email}, no existe`,
      };
    }
    res.status(201).json(usuario);
  } catch (error) {
    res.status(error.status || 403).send(error.message);
  }
};
