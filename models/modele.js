const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const modele = sequelize.define('Modele', {
    id_modele: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nbPortes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    moteur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nbPlaces: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    prix: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    freezeTableName: true
});


module.exports = modele;