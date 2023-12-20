const express = require('express');
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// appel a nos routes dans le dossier route


port = 8000;
app.listen(port, () =>
    console.log(`Serveur lancé sur http://localhost:${port}`)
);