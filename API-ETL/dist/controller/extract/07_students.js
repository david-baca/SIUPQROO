const leerDBF = require('./leerDBF');
const Alumnos = require('../../model/Alumnos');
const path = require('path');

// Función principal para el proceso de extracción de grupos
async function procesarEstudiantes() {
    // Leer archivo DBF
    const filePath = path.resolve(__dirname, '../../DBF/DALUMN.DBF');
    const registrosDBF = await leerDBF(filePath);
    // Variable de iteración
    for (let i = 0; i < registrosDBF.length; i++) {
        const registro = registrosDBF[i];
        const { ALUCTR, ALUNOM, ALUAPP, ALUAPM } = registro;
        // Buscar la alumno por su clave ALUCTR
        const alumno = await Alumnos.findByPk(ALUCTR);
        if (alumno) {
            // Si la alumno existe, actualizar su nombre
            alumno.nombre = ALUAPP+" "+ALUAPM+" "+ALUNOM; // Actualiza el nombre de el alumno
            await alumno.save(); // Guarda los cambios en la base de datos
        }
    }
}
module.exports = procesarEstudiantes;