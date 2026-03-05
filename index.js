const express = require("express");
const { PORT = 3000 } = process.env;

const users = require("./data/users.json");
const cards = require("./data/cards.json");

const app = express();

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u._id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: "ID de usuario no encontrado" });
  }

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
