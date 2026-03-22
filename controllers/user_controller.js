const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: "Error al crear usuario" });
  }
};
