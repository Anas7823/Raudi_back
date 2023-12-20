const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const Modele = require('./modele');
const Option = require('./option');

const Posseder = sequelize.define('Posseder', {
  id_modele: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

Posseder.belongsTo(Modele, { foreignKey: 'id_modele' });
Posseder.belongsTo(Option, { foreignKey: 'id_option' });

module.exports = Posseder;