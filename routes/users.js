const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersPath = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    res.json(JSON.parse(data));
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: "ID de usuario no encontrado" });
    }

    res.json(user);
  });
});

module.exports = router;
