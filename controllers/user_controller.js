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
    const user = await User.findById(req.params.userId).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });

    res.send(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "ID inválido" });
    }

    if (err.statusCode === 404) {
      return res.status(404).send({ message: err.message });
    }

    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    res.status(201).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Datos inválidos" });
    }

    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });

    res.send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Datos inválidos" });
    }

    if (err.name === "CastError") {
      return res.status(400).send({ message: "ID inválido" });
    }

    if (err.statusCode === 404) {
      return res.status(404).send({ message: err.message });
    }

    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });

    res.send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Datos inválidos" });
    }

    if (err.statusCode === 404) {
      return res.status(404).send({ message: err.message });
    }

    res.status(500).send({ message: "Error interno del servidor" });
  }
};
