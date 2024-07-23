const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ListAsing = sequelize.define('ListAsing', {
  fk_profesores: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Profesores',
      key: 'pk'
    }
  },
  fk_grupos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Grupos',
      key: 'pk'
    }
  },
  fk_materias: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Materias',
      key: 'pk'
    }
  }
}, {
  tableName: 'List_Asing',
  timestamps: false,
  charset: 'latin1',
  collate: 'latin1_general_ci'
});

module.exports = ListAsing;