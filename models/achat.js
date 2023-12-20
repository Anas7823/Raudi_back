const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Modele = require('./modele');
const User = require('./user');

const Acheter = sequelize.define('Acheter', {
  id_modele: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  prixtotal: {
    type: DataTypes.DECIMAL(15, 2),
  },
  dateachat: {
    type: DataTypes.DATE,
  },
});

Acheter.belongsTo(Modele, { foreignKey: 'id_modele' });
Acheter.belongsTo(User, { foreignKey: 'id_user' });

module.exports = Acheter;