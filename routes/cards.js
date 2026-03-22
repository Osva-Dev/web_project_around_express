const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ruta cards funcionando");
});

module.exports = router;
