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

app.use((req, res, next) => {
  req.user = {
    _id: "69bf559a8ebde5821accc5e5",
  };
  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

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

app.use((err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "Error interno del servidor" : message,
  });
});

module.exports = app;
