const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const cardsPath = path.join(__dirname, "../data/cards.json");

router.get("/", (req, res) => {
  fs.readFile(cardsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    res.json(JSON.parse(data));
  });
});

module.exports = router;
