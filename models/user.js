const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    pseudo: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    mail: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.BOOLEAN,
    },
  });
  
module.exports = User;