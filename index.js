const express = require("express");
const app = express();
const router = express.Router();
const creditCards =  require('./controllers/creditCards');

router.get('/cc', creditCards.get);

app.use(router);

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

