const XlsxPopulate = require('xlsx-populate');
const { ListCalif, Grupos, Materias, Alumnos, Periodos, Carreras, Profesores, ListAsing } = require('../model/index');
const {estadisticasProfesores} = require('../model/ProfesoresProcess');
const {estadisticasAlumnos} = require('../model/AlumnosProcess');
const {estadisticasGrupos} = require('../model/GruposProcess');

exports.ReportALL = async (req, res) => {
    try {
        const { fkCarrera, fkPeriodo } = req.body;
        // Validar que fkCarrera y fkPeriodo no sean nulos y sean numéricos
        if (fkCarrera == null || typeof fkCarrera !== 'number' || fkPeriodo == null || typeof fkPeriodo !== 'number') {
            return res.status(400).send('Error: fkCarrera y fkPeriodo deben ser valores numéricos y no pueden ser nulos.');
        }
        // Obtener datos de ListCalif
        const data = await ListCalif.findAll({
            where: {fk_Periodos: fkPeriodo},
            attributes: ['calif'],
            include: [
                {
                    model: Grupos,
                    as: 'Grupo',
                    where: {fk_carreras: fkCarrera},
                    attributes: ['codigo', 'turno', 'pk','cant_mat','p_ap','p_rep'],
                    include: [
                        {
                            model: Carreras,
                            as: 'Carrera',
                            attributes: ['nombre',"cant_grup","p_ap","p_rep"]
                        }
                    ]
                },
                {
                    model: Materias,
                    as: 'Materia',
                    attributes: ['nombre', 'pk','Cant_alum_ap','Cant_alum_rep','p_rep','p_ap','cant_grup'],
                },
                {
                    model: Alumnos,
                    as: 'Alumno',
                    attributes: ['matricula', 'nombre', 'p_ap', 'p_rep']
                },
                {
                    model: Periodos,
                    as: 'Periodo',
                    attributes: ['Periodo'],
                },
            ]
        });

        // Formatear datos para el Excel
        const formattedDataGrupos = await estadisticasGrupos({ fkCarrera, fkPeriodo })
        const formattedDataAlumno = await estadisticasAlumnos({ fkCarrera, fkPeriodo })
        const formattedDataProfesores = await estadisticasProfesores({ fkCarrera, fkPeriodo })
        const formattedDataGeneral = await Promise.all(data.map(async entry => {
            const listAsing = await ListAsing.findOne({
                where: {
                    fk_materias: entry.Materia.pk,
                    fk_grupos: entry.Grupo.pk
                },
                include: [
                    {
                        model: Profesores,
                        as: 'Profesor',
                        attributes: ['nombre']
                    }
                ]
            });

            return {
                'Matricula del alumno': entry.Alumno.matricula,
                'Nombre del alumno': entry.Alumno.nombre,
                'Nombre de la carrera': entry.Grupo.Carrera.nombre,
                'Codigo del grupo': entry.Grupo.codigo,
                'Turno del grupo': entry.Grupo.turno,
                'Nombre de la materia': entry.Materia.nombre,
                'Periodo escolar': entry.Periodo.Periodo,
                'Calificacion': entry.calif,
                'Nombre del profesor': listAsing ? listAsing.Profesor.nombre : 'No asignado'
            };
        }));

        // Función para generar y enviar el archivo Excel
        async function generateExcel() {
            const workbook = await XlsxPopulate.fromBlankAsync();
            const sheetGeneral = workbook.addSheet('General');
            //eliminar la hoja por defecto 
            workbook.deleteSheet('Sheet1');
            // Agregar encabezados
            const headersGeneral = [
                'Matricula del alumno',
                'Nombre del alumno',
                'Nombre de la carrera',
                'Codigo del grupo',
                'Turno del grupo',
                'Nombre de la materia',
                'Periodo escolar',
                'Calificacion',
                'Nombre del profesor'
            ];
            headersGeneral.forEach((header, index) => {
                sheetGeneral.cell(1, index + 1).value(header);
            });
            // Agregar datos
            formattedDataGeneral.forEach((item, rowIndex) => {
                Object.keys(item).forEach((key, colIndex) => {
                    sheetGeneral.cell(rowIndex + 2, colIndex + 1).value(item[key]);
                });
            });
             // Ajustar el ancho de las columnas
             const columnWidthsGeneral = [20, 40, 50, 15, 15, 50, 20, 15, 50];
             columnWidthsGeneral.forEach((width, index) => {
                sheetGeneral.column(index + 1).width(width);
             });
             //_____________________________________________________________________
            const sheetProfesor = workbook.addSheet('Profesores');
            // Agregar encabezados
            const headersPofesor = [
                'Nombre del profesor',
                'Promedio de reprobación',
                'Promedio de aprovechamiento',
            ];
            headersPofesor.forEach((header, index) => {
                sheetProfesor.cell(1, index + 1).value(header);
            });
            // Agregar datos
            formattedDataProfesores.forEach((item, rowIndex) => {
                Object.keys(item).forEach((key, colIndex) => {
                    sheetProfesor.cell(rowIndex + 2, colIndex + 1).value(item[key]);
                });
            });
             // Ajustar el ancho de las columnas
             const columnWidthsProfesor = [50, 23, 28];
             columnWidthsProfesor.forEach((width, index) => {
                sheetProfesor.column(index + 1).width(width);
             });
             //_____________________________________________________________________
            const sheetAlumno = workbook.addSheet('Alumnos');
            // Agregar encabezados
            const headersAlumno = [
                'Matricula del alumno',
                'Nombre del alumno',
                'Promedio de reprobación',
                'Promedio de aprovechamiento',
            ];
            headersAlumno.forEach((header, index) => {
                sheetAlumno.cell(1, index + 1).value(header);
            });
            // Agregar datos
            formattedDataAlumno.forEach((item, rowIndex) => {
                Object.keys(item).forEach((key, colIndex) => {
                    sheetAlumno.cell(rowIndex + 2, colIndex + 1).value(item[key]);
                });
            });
             // Ajustar el ancho de las columnas
             const columnWidthsAlumno = [20, 50, 24, 29];
             columnWidthsAlumno.forEach((width, index) => {
                sheetAlumno.column(index + 1).width(width);
             });
            //_____________________________________________________________________________________
            const sheetGrupos = workbook.addSheet('Grupos');
            // Agregar encabezados
            const headersGrupos = [
                'Nombre del grupo',
                'Turno del grupo',
                'cantidad de materias en el grupo',
                'Promedio de reprobación',
                'Promedio de aprovechamiento',
            ];
            headersGrupos.forEach((header, index) => {
                sheetGrupos.cell(1, index + 1).value(header);
            });
            // Agregar datos
            formattedDataGrupos.forEach((item, rowIndex) => {
                Object.keys(item).forEach((key, colIndex) => {
                    sheetGrupos.cell(rowIndex + 2, colIndex + 1).value(item[key]);
                });
            });
             // Ajustar el ancho de las columnas
             const columnWidthsGrupos = [18, 16, 30, 24, 24];
             columnWidthsGrupos.forEach((width, index) => {
                sheetGrupos.column(index + 1).width(width);
             });
            //_____________________________________________________________________________________
            // Convertir el libro en un buffer
            const buffer = await workbook.outputAsync();
            // Configurar la respuesta para descarga de archivo
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=Reporte.xlsx');
            // Enviar el buffer como respuesta
            res.end(buffer);
        }
        // Generar y enviar el archivo
        generateExcel();
    } catch (error) {
        console.error('Error al generar el archivo Excel:', error);
        res.status(500).send('Error al generar el archivo Excel');
    }
};