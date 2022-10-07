const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
// Cors permite que un cliete se conecta a otro servidor para el intercambio de recursos
const cors = require("cors");

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

// crear el servidor

const app = express();
// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defini un dominio para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    // Revisar si la petición viene de un servirdor que esta en la whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

// Habilitar cors
app.use(cors(corsOptions));

app.use("/", routes());

// carpeta publica
app.use(express.static("uploads"));

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
  console.log("el servidor esta funcionando");
});
// siempre al tener un cambio en node guarda y vuelve a recargar el servidor
