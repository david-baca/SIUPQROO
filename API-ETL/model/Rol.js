const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rol = sequelize.define('Rol', {
  pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'Roles',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

module.exports = Rol;
