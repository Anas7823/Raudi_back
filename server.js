const express = require('express');
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');

const achatRoute = require('./routes/achatRoute');
const modeleRoute = require('./routes/modeleRoute');
const optionRoute = require('./routes/optionRoute');
const possedeRoute = require('./routes/possedeRoute');
const userRoute = require('./routes/userRoute');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// appel a nos routes dans le dossier route
app.use('/achat', achatRoute);
app.use('/modele', modeleRoute);
app.use('/option', optionRoute);
app.use('/possede', possedeRoute);
app.use('/user', userRoute);

// sequelize.sync({ force: true }).then(() => { // force: true permet de supprimer les tables à chaque lancement du serveur
//     console.log('Tables synchronisées');
// });


port = 8000;
app.listen(port, () =>
    console.log(`Serveur lancé sur http://localhost:${port}`)
);