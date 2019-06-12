var compression = require("compression");
const express = require("express");
const app = express();
const creditCards = require("./controllers/creditCards");

app.use(compression());

app.get("/cc", creditCards.get);
app.get("/prueba", (req, res) => {
  return res.status(200).send({ mensaje: "hola" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor está inicializado en el puerto ${port}`);
});
