const XlsxPopulate = require('xlsx-populate');
const { ListCalif, Grupos, Materias, Alumnos, Periodos, Carreras, Profesores, ListAsing } = require('../model/index');
const { estadisticasProfesores } = require('../model/ProfesoresProcess');
const { estadisticasAlumnos } = require('../model/AlumnosProcess');
const { estadisticasGrupos } = require('../model/GruposProcess');
const { estadisticasMaterias } = require('../model/MateriasProcess');
const { estadisticasCarreras } = require('../model/CarrerasProcess');

const validateRequestBody = (body) => {
    const { fkCarrera, fkPeriodo } = body;
    return fkCarrera != null && typeof fkCarrera === 'number' && fkPeriodo != null && typeof fkPeriodo === 'number';
};

const fetchData = async (fkCarrera, fkPeriodo) => {
    return await ListCalif.findAll({
        where: { fk_Periodos: fkPeriodo },
        attributes: ['calif'],
        include: [
            {
                model: Grupos,
                as: 'Grupo',
                where: { fk_carreras: fkCarrera },
                attributes: ['codigo', 'turno', 'pk', 'cant_mat', 'p_ap', 'p_rep'],
                include: [{
                    model: Carreras,
                    as: 'Carrera',
                    attributes: ['nombre', 'cant_grup', 'p_ap', 'p_rep']
                }]
            },
            {
                model: Materias,
                as: 'Materia',
                attributes: ['nombre', 'pk', 'Cant_alum_ap', 'Cant_alum_rep', 'p_rep', 'p_ap', 'cant_grup'],
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
};

const formatData = async (data, fkCarrera, fkPeriodo) => {
    const estadisticas = await Promise.all([
        estadisticasGrupos({ fkCarrera, fkPeriodo }),
        estadisticasAlumnos({ fkCarrera, fkPeriodo }),
        estadisticasProfesores({ fkCarrera, fkPeriodo }),
        estadisticasMaterias({ fkCarrera, fkPeriodo }),
        estadisticasCarreras({ fkCarrera, fkPeriodo }),
    ]);

    const formattedDataGeneral = await Promise.all(data.map(async entry => {
        const listAsing = await ListAsing.findOne({
            where: {
                fk_materias: entry.Materia.pk,
                fk_grupos: entry.Grupo.pk
            },
            include: [{
                model: Profesores,
                as: 'Profesor',
                attributes: ['nombre']
            }]
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

    return { estadisticas, formattedDataGeneral };
};

const createSheet = (workbook, sheetName, headers, data, columnWidths) => {
    const sheet = workbook.addSheet(sheetName);
    headers.forEach((header, index) => {
        sheet.cell(1, index + 1).value(header);
    });
    data.forEach((item, rowIndex) => {
        Object.keys(item).forEach((key, colIndex) => {
            sheet.cell(rowIndex + 2, colIndex + 1).value(item[key]);
        });
    });
    columnWidths.forEach((width, index) => {
        sheet.column(index + 1).width(width);
    });
};

const generateExcel = async (res, formattedData, namedata) => {
    const workbook = await XlsxPopulate.fromBlankAsync();

    const sheetsData = [
        {
            name: 'General',
            headers: [
                'Matricula del alumno',
                'Nombre del alumno',
                'Nombre de la carrera',
                'Codigo del grupo',
                'Turno del grupo',
                'Nombre de la materia',
                'Periodo escolar',
                'Calificacion',
                'Nombre del profesor'
            ],
            data: formattedData.formattedDataGeneral,
            columnWidths: [20, 40, 50, 15, 15, 50, 20, 15, 50]
        },
        {
            name: 'Profesores',
            headers: ['Nombre del profesor', 'Promedio de reprobación', 'Promedio de aprovechamiento'],
            data: formattedData.estadisticas[2],
            columnWidths: [50, 23, 28]
        },
        {
            name: 'Alumnos',
            headers: ['Matricula del alumno', 'Nombre del alumno', 'Promedio de reprobación', 'Promedio de aprovechamiento'],
            data: formattedData.estadisticas[1],
            columnWidths: [20, 50, 24, 29]
        },
        {
            name: 'Grupos',
            headers: ['Nombre del grupo', 'Turno del grupo', 'cantidad de materias en el grupo', 'Promedio de reprobación', 'Promedio de aprovechamiento'],
            data: formattedData.estadisticas[0],
            columnWidths: [18, 16, 30, 24, 24]
        },
        {
            name: 'Materias',
            headers: [
                'Nombre de la materia',
                'Codigo de la materia',
                'Cantidad de grupos en la materia',
                'Cantidad de reprobación',
                'Cantidad de aprovechamiento',
                'Promedio de reprobación',
                'Promedio de aprovechamiento'
            ],
            data: formattedData.estadisticas[3],
            columnWidths: [50, 18, 30, 24, 27, 24, 28]
        },
        {
            name: 'Carrera',
            headers: ['Nombre de la carrera', 'Cantidad de grupos en la carrera', 'Promedio de reprobación', 'Promedio de aprovechamiento'],
            data: formattedData.estadisticas[4],
            columnWidths: [50, 29, 24, 28]
        }
    ];

    sheetsData.forEach(sheet => createSheet(workbook, sheet.name, sheet.headers, sheet.data, sheet.columnWidths));
    workbook.deleteSheet('Sheet1');
    const buffer = await workbook.outputAsync();
    console.log(namedata)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${namedata}.xlsx`);
    res.end(buffer);
};

exports.ReportALL = async (req, res) => {
    try {
        if (!validateRequestBody(req.body)) {
            return res.status(400).send('Error: fkCarrera y fkPeriodo deben ser valores numéricos y no pueden ser nulos.');
        }
        const { fkCarrera, fkPeriodo } = req.body;
        const periodo = await Periodos.findByPk(fkPeriodo)
        const carrera = await Carreras.findByPk(fkCarrera)
        const namedata = "Reporte de "+carrera.nombre+"-"+periodo.Periodo
        console.log(namedata)
        const data = await fetchData(fkCarrera, fkPeriodo);
        const formattedData = await formatData(data, fkCarrera, fkPeriodo);
        await generateExcel(res, formattedData, namedata);
    } catch (error) {
        console.error('Error al generar el archivo Excel:', error);
        res.status(500).send('Error al generar el archivo Excel');
    }
};
