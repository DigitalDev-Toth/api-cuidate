const express = require("express");
const app = express();
const creditCards = require("./controllers/creditCards");

app.get("/cc", creditCards.get);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor está inicializado en el puerto ${port}`);
});
