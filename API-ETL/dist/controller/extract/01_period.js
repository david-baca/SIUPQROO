const path = require('path');
const fs = require('fs');
const Periodos = require('../../model/Periodo');
const leerDBF = require('./leerDBF');

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
                        periodosEncontrados.push({
                            ano: year,
                            estado: "activo",
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
                if(periodo.estado == "activo"){
                await Periodos.create({pk: periodo.codigoPeriodo,fecha_fin: periodo.
                    fechaFinPeriodo,Periodo: periodo.periodo});}
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
                    if(periodo.estado == "activo"){
                    await Periodos.create({pk: periodo.codigoPeriodo,fecha_fin: periodo.
                        fechaFinPeriodo,Periodo: periodo.periodo});}

                    for (let i = 0; i < request.length; i++) {
                        let fech2 = request[i].toString();
                        let month2 = fech2.substring(4, 7);
                        let year2 = fech2.substring(11, 16);
                        periodosEncontrados.push({
                            ano: year2,
                            estado: "inactivo",
                            fecha: null,
                            codigoPeriodo: null,
                            fechaFinPeriodo: null,
                            periodo: month2,
                        });
                        request.splice(i, 1);
                    }
                }
                return {
                    estado: true,
                    mensaje: "No se encontraron todos los periodos solicitados",
                    request: periodosEncontrados
                };
            }
        }
    } catch (error) {
        return {
            estado: false,
            mensaje: "Error en el proceso",
            request: null
        };
    }
};

module.exports = procesarPeriodos;