const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Modele = require('./modele');
const User = require('./user');

const Acheter = sequelize.define('Acheter', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_modele: {
    type: DataTypes.INTEGER,
    
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prixtotal: {
    type: DataTypes.DECIMAL(15, 2),
  }
}, {
  sequelize,
  freezeTableName: true
});

Acheter.belongsTo(Modele, { foreignKey: 'id_modele' });
Acheter.belongsTo(User, { foreignKey: 'id_user' });

module.exports = Acheter;