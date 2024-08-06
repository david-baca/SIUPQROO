const { Op, Sequelize } = require('sequelize');
const { Grupos, ListCalif, Materias } = require('./index'); // Asegúrate de importar desde el archivo correcto

exports.updateMaterias = async () => {
  try {
    // Obtener todas las calificaciones con la materia asociada
    const calificaciones = await ListCalif.findAll({
      attributes: ['calif', 'fk_grupos'],
      include: [{
        model: Materias,
        attributes: ['pk'], // Asegúrate de que 'pk' sea el campo correcto
        as: 'Materia'
      }],
      where: {
        calif: {
          [Op.ne]: null
        }
      },
      raw: true
    });

    // Agrupar calificaciones por materia
    const calificacionesPorMateria = calificaciones.reduce((acc, curr) => {
      const materiaPk = curr['Materia.pk']; // Cambiado a 'Materia.pk'
      if (!acc[materiaPk]) {
        acc[materiaPk] = {
          califs: [],
          grupos: new Set() // Usar un Set para evitar duplicados
        };
      }
      acc[materiaPk].califs.push(curr.calif);
      acc[materiaPk].grupos.add(curr['fk_grupos']);
      return acc;
    }, {});

    // Actualizar la información de las materias
    for (const [materiaPk, { califs, grupos }] of Object.entries(calificacionesPorMateria)) {
      const calificacionesAprobatorias = califs.filter(calif => calif >= 7).length;
      const calificacionesReprobatorias = califs.filter(calif => calif < 7).length;
      const totalCalificaciones = califs.length;

      const p_ap = Math.round((calificacionesAprobatorias / totalCalificaciones) * 100);
      const p_rep = Math.round((calificacionesReprobatorias / totalCalificaciones) * 100);

      // Obtener la cantidad de grupos y alumnos únicos asociados a la materia
      const cantGrupos = grupos.size;

      // Contar alumnos que aprobaron y reprobaron por materia
      const alumnosAprobatorios = await ListCalif.count({
        where: {
          fk_materias: materiaPk,
          calif: {
            [Op.gte]: 7
          }
        }
      });

      const alumnosReprobatorios = await ListCalif.count({
        where: {
          fk_materias: materiaPk,
          calif: {
            [Op.lt]: 7
          }
        }
      });

      await Materias.update(
        { p_ap, p_rep, cant_grup: cantGrupos, Cant_alum_ap: alumnosAprobatorios, Cant_alum_rep: alumnosReprobatorios }, // Incluyendo 'cant_grup', 'cant_alum_ap', y 'cant_alum_rep'
        { where: { pk: materiaPk } } // Cambiado a 'pk'
      );
    }

    console.log('Actualización de materias completada.');
  } catch (error) {
    console.error('Error actualizando materias:', error);
  }
};

exports.estadisticasMaterias = async ({ fkCarrera, fkPeriodo }) => {
  try {
    // Obtener todas las calificaciones con la materia y grupo asociados
    const calificaciones = await ListCalif.findAll({
      where: {fk_Periodos: fkPeriodo},
      attributes: ['calif', 'fk_grupos'],
      include: [
        {
          model: Materias,
          attributes: ['pk', 'nombre', 'codigo'], // Asegúrate de incluir 'nombre' y 'codigo'
          as: 'Materia'
        },
        {
          model: Grupos,
          where: {fk_carreras: fkCarrera},
          attributes: ['pk'], // Asegúrate de que 'pk' sea el campo correcto
          as: 'Grupo'
        }
      ],
      where: {
        calif: {
          [Op.ne]: null
        }
      },
      raw: true
    });

    // Agrupar calificaciones por materia
    const calificacionesPorMateria = calificaciones.reduce((acc, curr) => {
      const materiaPk = curr['Materia.pk']; // Cambiado a 'Materia.pk'
      if (!acc[materiaPk]) {
        acc[materiaPk] = {
          nombre: curr['Materia.nombre'],
          codigo: curr['Materia.codigo'],
          califs: [],
          grupos: new Set() // Usar un Set para evitar duplicados
        };
      }
      acc[materiaPk].califs.push(curr.calif);
      acc[materiaPk].grupos.add(curr['fk_grupos']);
      return acc;
    }, {});

    let response = [];

    // Actualizar la información de las materias
    for (const [materiaPk, { nombre, codigo, califs, grupos }] of Object.entries(calificacionesPorMateria)) {
      const calificacionesAprobatorias = califs.filter(calif => calif >= 7).length;
      const calificacionesReprobatorias = califs.filter(calif => calif < 7).length;
      const totalCalificaciones = califs.length;

      const p_ap = Math.round((calificacionesAprobatorias / totalCalificaciones) * 100);
      const p_rep = Math.round((calificacionesReprobatorias / totalCalificaciones) * 100);

      // Obtener la cantidad de grupos y alumnos únicos asociados a la materia
      const cantGrupos = grupos.size;

      // Contar alumnos que aprobaron y reprobaron por materia
      const alumnosAprobatorios = await ListCalif.count({
        where: {
          fk_materias: materiaPk,
          calif: {
            [Op.gte]: 7
          }
        }
      });

      const alumnosReprobatorios = await ListCalif.count({
        where: {
          fk_materias: materiaPk,
          calif: {
            [Op.lt]: 7
          }
        }
      });

      response.push({
        'Nombre de la materia': nombre,
        'Codigo de la materia': codigo,
        'Cantidad de grupos en la materia': cantGrupos,
        'Cantidad de reprobación': alumnosReprobatorios,
        'Cantidad de aprovechamiento': alumnosAprobatorios,
        'Promedio de reprobación': p_rep,
        'Promedio de aprovechamiento': p_ap,
      });
    }

    return response;
  } catch (error) {
    console.error('Error obteniendo estadísticas de materias:', error);
    return null;
  }
};
