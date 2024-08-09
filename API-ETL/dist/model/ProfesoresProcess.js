const { Op } = require('sequelize');
const { Grupos, ListCalif, Materias, Alumnos, Periodos, Carreras, Profesores, ListAsing } = require('../model/index');

exports.updateProfesores = async () => {
  try {
    // Obtener todas las calificaciones
    const calificaciones = await ListCalif.findAll({
      attributes: ['calif', 'fk_grupos', 'fk_materias', 'fk_alumnos', 'fk_Periodos'],
      include: [
        {
          model: Grupos,
          as: 'Grupo',
          attributes: ['pk', 'fk_carreras']
        },
        {
          model: Materias,
          as: 'Materia',
          attributes: ['pk']
        }
      ],
      raw: true
    });

    // Obtener todas las asignaciones de profesores
    const asignaciones = await ListAsing.findAll({
      attributes: ['fk_profesores', 'fk_materias', 'fk_grupos'],
      include: [
        {
          model: Profesores,
          as: 'Profesor',
          attributes: ['pk', 'nombre']
        }
      ],
      raw: true
    });

    // Crear un mapa de asignaciones para fácil acceso
    const asignacionesPorMateriaYGrupo = new Map();
    asignaciones.forEach(asignacion => {
      const clave = `${asignacion.fk_materias}-${asignacion.fk_grupos}`;
      if (!asignacionesPorMateriaYGrupo.has(clave)) {
        asignacionesPorMateriaYGrupo.set(clave, []);
      }
      asignacionesPorMateriaYGrupo.get(clave).push(asignacion.fk_profesores);
    });

    // Agrupar calificaciones por profesor
    const calificacionesPorProfesor = {};
    calificaciones.forEach(entry => {
      const clave = `${entry.fk_materias}-${entry.fk_grupos}`;
      const profesores = asignacionesPorMateriaYGrupo.get(clave);
      if (profesores) {
        profesores.forEach(profesorPk => {
          if (!calificacionesPorProfesor[profesorPk]) {
            calificacionesPorProfesor[profesorPk] = { califs: [], carreras: new Set() };
          }
          calificacionesPorProfesor[profesorPk].califs.push(entry.calif);
          calificacionesPorProfesor[profesorPk].carreras.add(entry['Grupo.fk_carreras']);
        });
      }
    });

    // Actualizar la información de los profesores
    for (const [profesorPk, { califs, carreras }] of Object.entries(calificacionesPorProfesor)) {
      const calificacionesAprobatorias = califs.filter(calif => calif >= 7).length;
      const calificacionesReprobatorias = califs.filter(calif => calif < 7).length;
      const totalCalificaciones = califs.length;

      const p_ap = Math.round((calificacionesAprobatorias / totalCalificaciones) * 100);
      const p_rep = Math.round((calificacionesReprobatorias / totalCalificaciones) * 100);
      const cantCarreras = carreras.size;

      await Profesores.update(
        { p_ap, p_rep, cant_carr: cantCarreras },
        { where: { pk: profesorPk } }
      );
    }

    console.log('Actualización de profesores completada.');
  } catch (error) {
    console.error('Error actualizando profesores:', error);
  }
};

exports.estadisticasProfesores = async ({ fkCarrera, fkPeriodo }) => {
  try {
    // Obtener todas las calificaciones
    const calificaciones = await ListCalif.findAll({
      where: {fk_Periodos: fkPeriodo},
      attributes: ['calif', 'fk_grupos', 'fk_materias', 'fk_alumnos', 'fk_Periodos'],
      include: [
        {
          model: Grupos,
          as: 'Grupo',
          where: {fk_carreras: fkCarrera},
          attributes: ['pk', 'fk_carreras']
        },
        {
          model: Materias,
          as: 'Materia',
          attributes: ['pk']
        }
      ],
      raw: true
    });

    // Obtener todas las asignaciones de profesores
    const asignaciones = await ListAsing.findAll({
      attributes: ['fk_profesores', 'fk_materias', 'fk_grupos'],
      include: [
        {
          model: Profesores,
          as: 'Profesor',
          attributes: ['pk', 'nombre']
        }
      ],
      raw: true
    });

    // Crear un mapa de asignaciones para fácil acceso
    const asignacionesPorMateriaYGrupo = new Map();
    asignaciones.forEach(asignacion => {
      const clave = `${asignacion.fk_materias}-${asignacion.fk_grupos}`;
      if (!asignacionesPorMateriaYGrupo.has(clave)) {
        asignacionesPorMateriaYGrupo.set(clave, []);
      }
      asignacionesPorMateriaYGrupo.get(clave).push({
        fk_profesores: asignacion.fk_profesores,
        nombre: asignacion['Profesor.nombre']
      });
    });
    //const
    let response = [];
    // Agrupar calificaciones por profesor
    const calificacionesPorProfesor = {};
    calificaciones.forEach(entry => {
      const clave = `${entry.fk_materias}-${entry.fk_grupos}`;
      const profesores = asignacionesPorMateriaYGrupo.get(clave);
      if (profesores) {
        profesores.forEach(profesor => {
          const { fk_profesores, nombre } = profesor;
          if (!calificacionesPorProfesor[fk_profesores]) {
            calificacionesPorProfesor[fk_profesores] = { nombre, califs: [], carreras: new Set() };
          }
          calificacionesPorProfesor[fk_profesores].califs.push(entry.calif);
          calificacionesPorProfesor[fk_profesores].carreras.add(entry['Grupo.fk_carreras']);
        });
      }
    });

    // Mostrar la información de los profesores sin actualizar
    for (const { nombre, califs, carreras } of Object.values(calificacionesPorProfesor)) {
      const calificacionesAprobatorias = califs.filter(calif => calif >= 7).length;
      const calificacionesReprobatorias = califs.filter(calif => calif < 7).length;
      const totalCalificaciones = califs.length;

      const p_ap = Math.round((calificacionesAprobatorias / totalCalificaciones) * 100);
      const p_rep = Math.round((calificacionesReprobatorias / totalCalificaciones) * 100);
      const cantCarreras = carreras.size;
      
      // Imprimir los datos de los profesores
      response.push({
          'Nombre del profesor': nombre,
          'Promedio de reprobación': p_rep,
          'Promedio de aprovechamiento': p_ap,
      });
    }
    return(response)
  } catch (error) {
    console.error('Error mostrando datos de profesores:', error);
    return(null)
  }
};
