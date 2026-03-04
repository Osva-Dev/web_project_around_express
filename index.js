const express = require("express");
// detecta el puerto 3000
const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  // si todo funciona bien, la consola mostrará qué puerto está detectando la aplicación
  console.log(`App listening at port ${PORT}`);
});
