const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('owner');
    return res.send(cards);
  } catch (err) {
    return res.status(500).send({ message: 'Error interno del servidor' });
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

    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Datos inválidos' });
    }

    return res.status(500).send({ message: 'Error interno del servidor' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(() => {
      const error = new Error('Carta no encontrada');
      error.statusCode = 404;
      throw error;
    });

    await card.deleteOne();

    return res.send({ message: 'Carta eliminada' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID inválido' });
    }

    if (err.statusCode === 404) {
      return res.status(404).send({ message: err.message });
    }

    return res.status(500).send({ message: 'Error interno del servidor' });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => {
      const error = new Error('Carta no encontrada');
      error.statusCode = 404;
      throw error;
    });

    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID inválido' });
    }

    if (err.statusCode === 404) {
      return res.status(404).send({ message: err.message });
    }

    return res.status(500).send({ message: 'Error interno del servidor' });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => {
      const error = new Error('Carta no encontrada');
      error.statusCode = 404;
      throw error;
    });

    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID inválido' });
    }

    if (err.statusCode === 404) {
      return res.status(404).send({ message: err.message });
    }

    return res.status(500).send({ message: 'Error interno del servidor' });
  }
};
