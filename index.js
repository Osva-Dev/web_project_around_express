require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

module.exports = app;
