const Card = require("../models/card");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("owner");
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });

    res.status(201).send(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Datos inválidos" });
    }

    res.status(500).send({ message: "Error interno del servidor" });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(() => {
      const error = new Error("Carta no encontrada");
      error.statusCode = 404;
      throw error;
    });

    await card.deleteOne();

    res.send({ message: "Carta eliminada" });
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
