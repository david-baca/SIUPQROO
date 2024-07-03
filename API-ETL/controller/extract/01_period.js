const { Dbf } = require('dbf-reader');
const fs = require('fs');
const path = require('path');
const Periodos = require('../../model/Periodo');

// Función principal para procesar periodos
const procesarPeriodos = async (request) => {
    try {
        const solicitados = request.length;
        const filePath = path.resolve(__dirname, '../../DBF/DPERIO.DBF');
        const registrosPDOINI = await leerDBF(filePath);
        let periodosEncontrados = [];

        for (let registro of registrosPDOINI) {
            if (registro.PDOINI != null) {
                let fech = registro.PDOINI.toString();
                let month = fech.substring(4, 7);
                let year = fech.substring(11, 16);
                for (let i = 0; i < request.length; i++) {
                    let fech2 = request[i].toString();
                    let month2 = fech2.substring(4, 7);
                    let year2 = fech2.substring(11, 16);
                    if (year === year2 && month === month2) {
                        console.log(fech);
                        periodosEncontrados.push({
                            fecha: request[i],
                            codigoPeriodo: registro.PDOCVE,
                            fechaFinPeriodo: registro.PDOTER,
                            periodo: registro.PDODES
                        });
                        request.splice(i, 1);
                    }
                }
            }
        }

        if (request.length === 0) {
            for (let periodo of periodosEncontrados) {
                await agregarPeriodoDB(periodo.codigoPeriodo, periodo.fechaFinPeriodo, periodo.periodo);
            }
            return {
                estado: true,
                mensaje: "Periodos exitosamente encontrados",
                request: periodosEncontrados
            };
        } else {
            if (solicitados === request.length) {
                return {
                    estado: false,
                    mensaje: "No se encontraron ninguno de los periodos solicitados",
                    request: null
                };
            } else {
                for (let periodo of periodosEncontrados) {
                    await agregarPeriodoDB(periodo.codigoPeriodo, periodo.fechaFinPeriodo, periodo.periodo);
                }
                return {
                    estado: true,
                    mensaje: "No se encontraron todos los periodos solicitados",
                    request: periodosEncontrados
                };
            }
        }
    } catch (error) {
        console.error('Error en el proceso:', error);
        return {
            estado: false,
            mensaje: "Error en el proceso",
            request: null
        };
    }
};
// Función para leer archivo DBF usando dbf-reader
async function leerDBF(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        const datatable = Dbf.read(buffer);
        return datatable.rows.map(row => {
            const registro = {};
            datatable.columns.forEach(col => {
                if (row[col.name] instanceof Date) {
                    const date = new Date(row[col.name]);
                    date.setMonth(date.getMonth() - 1);
                    registro[col.name] = date;
                } else {
                    registro[col.name] = row[col.name];
                }
            });
            return registro;
        });
    } catch (error) {
        throw new Error('Error al leer el archivo DBF: ' + error.message);
    }
}

// Función para agregar periodo a la base de datos
async function agregarPeriodoDB(codigoPeriodo, fechaFinPeriodo, periodo) {
    try {
        await Periodos.create({
            pk: codigoPeriodo,
            fecha_fin: fechaFinPeriodo,
            Periodo: periodo
        });
        console.log(`Agregando periodo ${codigoPeriodo} con fecha fin ${fechaFinPeriodo}`);
    } catch (error) {
        console.error('Error al agregar periodo a la base de datos:', error);
    }
}

module.exports = procesarPeriodos;