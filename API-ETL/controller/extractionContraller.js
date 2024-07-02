const express = require('express');
const fileUpload = require('express-fileupload');
const validaciones = require('./extract/00_validation');
const extract_Per = require('./extract/01_period');
const extract_ListCalif = require('./extract/02_ListCalif');

// extracción de datos
exports.getRegistersDBF = async (req, res) => {
    try {
        // Validar existencia de archivos DBF y conexión a la base de datos
        const Validacion = await validaciones.validarArchivos();
        if (!Validacion.estado) {
            return res.status(400).json(Validacion);
        }

        // extraer periodos
        const Per = await extract_Per.procesarPeriodos(per_busq);
        if (!Per.estado) {
            return res.status(400).json(Per);
        }

        // extraer calificaciones
        const ListCalif = await extract_ListCalif.validarArchivos(per_busq);
        if (!ListCalif.estado) {
            return res.status(400).json(ListCalif);
        }

        res.status(200).json({ estado: true, mensaje: 'Extracción de datos completada exitosamente.' });
    } catch (error) {
        res.status(500).json({ estado: false, mensaje: 'Error en el servidor', error: error.message });
    }
};