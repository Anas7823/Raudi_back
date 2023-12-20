const {Sequelize} = require('sequelize');

const sequelize = new Sequelize ('raudi', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});
sequelize.authenticate().then(()=>{
    console.log('Connexion à la base de données réussie !')
}).catch((err) => {
    console.log("erreur: ".err);
});

module.exports = sequelize;
