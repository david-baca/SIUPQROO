// updateAlumnos.js
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../config/database');
const { Grupos, ListCalif, Alumnos} = require('../model/index');

exports.updateAlumnos = async () => {
  try {
    // Obtener todas las calificaciones agrupadas por alumno
    const calificaciones = await ListCalif.findAll({
      attributes: ['fk_alumnos', 'calif'],
      where: {
        calif: {
          [Op.ne]: null // Excluir calificaciones nulas
        }
      },
      raw: true
    });

    // Agrupar las calificaciones por alumno
    const calificacionesPorAlumno = calificaciones.reduce((acc, curr) => {
      if (!acc[curr.fk_alumnos]) {
        acc[curr.fk_alumnos] = [];
      }
      acc[curr.fk_alumnos].push(curr.calif);
      return acc;
    }, {});

    // Calcular p_ap y p_rep y actualizar los alumnos
    for (const [alumnoId, califs] of Object.entries(calificacionesPorAlumno)) {
      const materiasAprobadas = califs.filter(calif => calif >= 7).length;
      const materiasReprobadas = califs.filter(calif => calif < 7).length;
      const totalMaterias = califs.length;

      const p_ap = Math.round((materiasAprobadas / totalMaterias) * 100);
      const p_rep = Math.round((materiasReprobadas / totalMaterias) * 100);

      await Alumnos.update(
        { p_ap, p_rep },
        { where: { matricula: alumnoId } }
      );
    }

    console.log('Actualización completada.');
  } catch (error) {
    console.error('Error actualizando calificaciones:', error);
  }
};

exports.estadisticasAlumnos = async ({ fkCarrera, fkPeriodo }) => {
  try {
    // Obtener todas las calificaciones agrupadas por alumno
    const calificaciones = await ListCalif.findAll({
      where: {fk_Periodos: fkPeriodo},
      attributes: ['fk_alumnos', 'calif'],
      where: {
        calif: {
          [Op.ne]: null // Excluir calificaciones nulas
        }
      },
      include: [
        {
          model: Alumnos,
          as: 'Alumno',
          attributes: ['nombre']
        },
        {
          model: Grupos,
          as: 'Grupo',
          where: {fk_carreras: fkCarrera},
          attributes: ['pk', 'fk_carreras']
        }
      ],
      raw: true
    });
    // Agrupar las calificaciones por alumno
    const calificacionesPorAlumno = calificaciones.reduce((acc, curr) => {
      if (!acc[curr['fk_alumnos']]) {
        acc[curr['fk_alumnos']] = {
          nombre: curr['Alumno.nombre'],
          calificaciones: []
        };
      }
      acc[curr['fk_alumnos']].calificaciones.push(curr['calif']);
      return acc;
    }, {});

    let response = [];
    // Calcular p_ap y p_rep y actualizar los alumnos
    for (const [alumnoId, { nombre, calificaciones }] of Object.entries(calificacionesPorAlumno)) {
      const materiasAprobadas = calificaciones.filter(calif => calif >= 7).length;
      const materiasReprobadas = calificaciones.filter(calif => calif < 7).length;
      const totalMaterias = calificaciones.length;

      const p_ap = Math.round((materiasAprobadas / totalMaterias) * 100);
      const p_rep = Math.round((materiasReprobadas / totalMaterias) * 100);

      // Agregar los datos de los alumnos a la respuesta
      response.push({
        'Matricula del alumno': alumnoId,
        'Nombre del alumno': nombre,
        'Promedio de reprobación': p_rep,
        'Promedio de aprovechamiento': p_ap,
      });
    }
    return response;
  } catch (error) {
    console.error('Error obteniendo estadísticas de alumnos:', error);
    return null;
  }
};