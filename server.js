const express = require('express');
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');

const achatRoute = require('./routes/achat');
const modeleRoute = require('./routes/modele');
const optionRoute = require('./routes/option');
const possedeRoute = require('./routes/possede');
const userRoute = require('./routes/user');

app.use('/', achatRoute);
app.use('/', modeleRoute);
app.use('/', optionRoute);
app.use('/', possedeRoute);
app.use('/', userRoute);

sequelize.sync({ force: true }).then(() => {
    console.log('Tables synchronisées');
});

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// appel a nos routes dans le dossier route


port = 8000;
app.listen(port, () =>
    console.log(`Serveur lancé sur http://localhost:${port}`)
);