const Card = require("../models/card");

// GET /cards
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("owner");
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

// POST /cards
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

    res.status(500).send({ message: "Error al crear la carta" });
  }
};

// DELETE /cards/:cardId
module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);

    if (!card) {
      return res.status(404).send({ message: "Carta no encontrada" });
    }

    res.send({ message: "Carta eliminada" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "ID inválido" });
    }

    res.status(500).send({ message: "Error interno del servidor" });
  }
};
