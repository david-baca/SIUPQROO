// model/CarrerasProcess.js
const { Op } = require('sequelize');
const { Carreras, ListCalif, Grupos } = require('./index'); // Asegúrate de importar desde el archivo de asociaciones

exports.updateCarreras = async () => {
  try {
    // Obtener todas las calificaciones con el grupo y la carrera asociada
    const calificaciones = await ListCalif.findAll({
      attributes: ['calif'],
      include: [{
        model: Grupos,
        attributes: ['fk_carreras'],
        as: 'Grupo',
        include: [{
          model: Carreras,
          as: 'Carrera'
        }]
      }],
      where: {
        calif: {
          [Op.ne]: null
        }
      },
      raw: true
    });

    // Agrupar calificaciones por carrera
    const calificacionesPorCarrera = calificaciones.reduce((acc, curr) => {
      const carreraId = curr['Grupo.fk_carreras'];
      if (!acc[carreraId]) {
        acc[carreraId] = [];
      }
      acc[carreraId].push(curr.calif);
      return acc;
    }, {});

    // Actualizar la información de las carreras
    for (const [carreraId, califs] of Object.entries(calificacionesPorCarrera)) {
      const materiasAprobadas = califs.filter(calif => calif >= 7).length;
      const materiasReprobadas = califs.filter(calif => calif < 7).length;
      const totalMaterias = califs.length;

      const p_ap = Math.round((materiasAprobadas / totalMaterias) * 100);
      const p_rep = Math.round((materiasReprobadas / totalMaterias) * 100);

      const cantGrupos = await Grupos.count({
        where: {
          fk_carreras: carreraId
        }
      });

      await Carreras.update(
        { p_ap, p_rep, cant_grup: cantGrupos },
        { where: { pk: carreraId } }  // Asegúrate de usar el nombre correcto de la columna primaria
      );
    }

    console.log('Actualización de carreras completada.');
  } catch (error) {
    console.error('Error actualizando carreras:', error);
  }
};

exports.estadisticasCarreras = async ({ fkCarrera, fkPeriodo }) => {
  try {
    // Obtener todas las calificaciones con el grupo y la carrera asociada
    const calificaciones = await ListCalif.findAll({
      where: {fk_Periodos: fkPeriodo},
      attributes: ['calif'],
      include: [{
        model: Grupos,
        attributes: ['fk_carreras'],
        where: {fk_carreras: fkCarrera},
        as: 'Grupo',
        include: [{
          model: Carreras,
          attributes: ['pk', 'nombre'], // Asegúrate de incluir 'nombre'
          as: 'Carrera'
        }]
      }],
      where: {
        calif: {
          [Op.ne]: null
        }
      },
      raw: true
    });

    // Agrupar calificaciones por carrera
    const calificacionesPorCarrera = calificaciones.reduce((acc, curr) => {
      const carreraId = curr['Grupo.fk_carreras'];
      if (!acc[carreraId]) {
        acc[carreraId] = {
          nombre: curr['Grupo.Carrera.nombre'], // Asegúrate de que 'nombre' es el campo correcto
          califs: []
        };
      }
      acc[carreraId].califs.push(curr.calif);
      return acc;
    }, {});

    let response = [];
    // Actualizar la información de las carreras
    for (const [carreraId, { nombre, califs }] of Object.entries(calificacionesPorCarrera)) {
      const materiasAprobadas = califs.filter(calif => calif >= 7).length;
      const materiasReprobadas = califs.filter(calif => calif < 7).length;
      const totalMaterias = califs.length;

      const p_ap = Math.round((materiasAprobadas / totalMaterias) * 100);
      const p_rep = Math.round((materiasReprobadas / totalMaterias) * 100);

      const cantGrupos = await Grupos.count({
        where: {
          fk_carreras: carreraId
        }
      });

      response.push({
        'Nombre de la carrera': nombre,
        'Cantidad de grupos en la carrera': cantGrupos,
        'Promedio de reprobación': p_rep,
        'Promedio de aprovechamiento': p_ap,
      });
    }

    return response;
  } catch (error) {
    console.error('Error obteniendo estadísticas de carrera:', error);
    return null;
  }
};