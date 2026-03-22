const express = require("express");
const router = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
} = require("../controllers/card_controller");

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);

module.exports = router;
