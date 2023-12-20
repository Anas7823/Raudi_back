const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const Option = sequelize.define('Option', {
    id_option: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  module.exports = Option;