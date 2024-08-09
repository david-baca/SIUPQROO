const validaciones = require('../extract/00_validation');
const procesarPeriodos = require('../extract/01_period');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const patCarpEst = path.resolve(__dirname, '../../estado');
const reload_process = require("../../config/reload_process");
// extracción de datos
exports.getRegistersDBF = async (req, res) => {
    try {
        //condicional de carga previa
        if (fs.existsSync(patCarpEst)) {
            return res.status(400).json({ estado: false, mensaje: 'Ya se ha realizado una carga de datos. limpie los datos antes de volver a cargar' });
        }
        // Obtener las fechas del body
        const { fecha1, fecha2, fecha3, fecha4 } = req.body;
        // Convertir las fechas a instancias de Date
        const fechas = [new Date(fecha1), new Date(fecha2), new Date(fecha3), new Date(fecha4)];
        // Filtrar fechas válidas
        const fechasValidas = fechas.filter(fecha => !isNaN(fecha));
        // Validar que tengamos al menos una fecha válida
        if (fechasValidas.length === 0) {
            return res.status(400).json({ estado: false, mensaje: 'Debe proporcionar al menos una fecha válida.' });
        }
        // Validar existencia de archivos DBF y conexión a la base de datos
        const Validacion = await validaciones();
        if (!Validacion.estado) {
            return res.status(400).json(Validacion);
        }
        //validar que los periodos se encuentren en los DBF
        const Periodo = await procesarPeriodos(fechas)
        if (!Periodo.estado) {
            return res.status(400).json(Periodo);
        }
        // Ejecutar el proceso de extracción en segundo plano
        // Ejecutar el proceso de extracción en segundo plano
        exec('node dist/controller/extract/start.js')
        //responder con los periodos aceoptados
        await reload_process()
        res.status(200).json(Periodo);
    } catch (error) {
        res.status(500).json({ estado: false, mensaje: 'Error en el servidor', error: error.message });
    }
};