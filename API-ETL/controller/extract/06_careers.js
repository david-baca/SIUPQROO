const leerDBF = require('./leerDBF');
const Carreras = require('../../model/Carreras');
const path = require('path');

// Función principal para el proceso de extracción de grupos
async function procesarCarreras(){
    // Leer archivo DBF
    const filePath = path.resolve(__dirname, '../../DBF/DPLANE.DBF');
    const registrosDBF = await leerDBF(filePath);
    // Variable de iteración
    for (let i = 0; i < registrosDBF.length; i++) {
        const registro = registrosDBF[i];
        const { CARCVE, PLACOF } = registro;
        // Buscar la carrera por su clave CARCVE
        const carrera = await Carreras.findByPk(CARCVE);
        if (carrera) {
            // Si la carrera existe, actualizar su nombre
            carrera.nombre = PLACOF; // Actualiza el nombre de la carrera
            await carrera.save(); // Guarda los cambios en la base de datos
        }
    }
}
module.exports = procesarCarreras;