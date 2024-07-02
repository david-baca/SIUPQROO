const sequelize = require('../config/database');
const Grupos = require('./Grupos');
const Materias = require('./Materias');
const Alumnos = require('./Alumnos');
const Periodos = require('./Periodo');
const Carreras = require('./Carreras');
const Profesores = require('./Profesores');
const ListCalif = require('./ListCalif');
const ListAsing = require('./ListAsing');
// Definir las asociaciones

// Profesores -> ListAsing
Profesores.hasMany(ListAsing, {
  foreignKey: 'Profesores_pk',
  sourceKey: 'pk',
  as: 'ListAsig'
});

ListAsing.belongsTo(Profesores, {
  foreignKey: 'Profesores_pk',
  targetKey: 'pk',
  as: 'Profesor'
});

// Carreras -> ListAsing
Carreras.hasMany(ListAsing, {
  foreignKey: 'Carreras_pk',
  sourceKey: 'pk',
  as: 'ListAsig'
});

ListAsing.belongsTo(Carreras, {
  foreignKey: 'Carreras_pk',
  targetKey: 'pk',
  as: 'Carrera'
});

// Grupos -> ListCalif
Grupos.hasMany(ListCalif, {
  foreignKey: 'fk_grupos',
  sourceKey: 'pk',
  as: 'ListCalif'
});

ListCalif.belongsTo(Grupos, {
  foreignKey: 'fk_grupos',
  targetKey: 'pk',
  as: 'Grupo'
});

// Materias -> ListCalif
Materias.hasMany(ListCalif, {
  foreignKey: 'fk_materias',
  sourceKey: 'pk',
  as: 'ListCalif'
});

ListCalif.belongsTo(Materias, {
  foreignKey: 'fk_materias',
  targetKey: 'pk',
  as: 'Materia'
});

// Alumnos -> ListCalif
Alumnos.hasMany(ListCalif, {
  foreignKey: 'fk_alumnos',
  sourceKey: 'matricula',
  as: 'ListCalif'
});

ListCalif.belongsTo(Alumnos, {
  foreignKey: 'fk_alumnos',
  targetKey: 'matricula',
  as: 'Alumno'
});

// Periodo -> ListCalif
Periodos.hasMany(ListCalif, {
  foreignKey: 'fk_Periodos',
  sourceKey: 'pk',
  as: 'ListCalif'
});

ListCalif.belongsTo(Periodos, {
  foreignKey: 'fk_Periodos',
  targetKey: 'pk',
  as: 'Periodo'
});

module.exports = {
  sequelize,
  Grupos,
  Materias,
  Alumnos,
  Periodos,
  Carreras,
  Profesores,
  ListCalif,
  ListAsing
};
