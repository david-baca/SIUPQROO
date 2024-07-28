const XlsxPopulate = require('xlsx-populate');
const { ListCalif, Grupos, Materias, Alumnos, Periodos, Carreras, Profesores, ListAsing } = require('../model/index');

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
                    attributes: ['codigo', 'turno', 'pk'],
                    include: [
                        {
                            model: Carreras,
                            as: 'Carrera',
                            attributes: ['nombre']
                        }
                    ]
                },
                {
                    model: Materias,
                    as: 'Materia',
                    attributes: ['nombre', 'pk'],
                },
                {
                    model: Alumnos,
                    as: 'Alumno',
                    attributes: ['matricula', 'nombre']
                },
                {
                    model: Periodos,
                    as: 'Periodo',
                    attributes: ['Periodo'],
                },
            ]
        });

        // Formatear datos para el Excel
        const formattedData = await Promise.all(data.map(async entry => {
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
            const sheet = workbook.sheet(0);
            // Agregar encabezados
            const headers = [
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
            headers.forEach((header, index) => {
                sheet.cell(1, index + 1).value(header);
            });
            // Agregar datos
            formattedData.forEach((item, rowIndex) => {
                Object.keys(item).forEach((key, colIndex) => {
                    sheet.cell(rowIndex + 2, colIndex + 1).value(item[key]);
                });
            });

             // Ajustar el ancho de las columnas
             const columnWidths = [20, 40, 50, 15, 15, 50, 20, 15, 50];
             columnWidths.forEach((width, index) => {
                 sheet.column(index + 1).width(width);
             });

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