const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  correo: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  usuario_pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'Usuarios',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

module.exports = Usuario;
