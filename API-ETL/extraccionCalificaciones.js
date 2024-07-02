const fs = require('fs');
const path = require('path');
const dbf = require('dbf-reader'); // Supongamos que usamos una biblioteca para leer archivos DBF
const mysql = require('mysql');

// Función para extraer datos de calificaciones
async function extraerCalificaciones() {
    const archivo = path.join(__dirname, 'DBF', 'DCALIF.dbf');

    // Verificar si el archivo existe
    if (!fs.existsSync(archivo)) {
        return { estado: false, mensaje: 'El archivo DCALIF.dbf no existe.' };
    }

    // Leer el archivo DBF
    let calificaciones;
    try {
        calificaciones = dbf.readSync(archivo);
    } catch (error) {
        return { estado: false, mensaje: 'Error al leer el archivo DCALIF.dbf.', error: error.message };
    }

    // Configurar conexión a la base de datos
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'tu_usuario',
        password: 'tu_contraseña',
        database: 'tu_base_de_datos'
    });

    return new Promise((resolve, reject) => {
        connection.connect(async (error) => {
            if (error) {
                return resolve({ estado: false, mensaje: 'Error en la conexión a la base de datos.', error: error.message });
            }

            // Iterar sobre los registros y procesarlos
            try {
                for (const calificacion of calificaciones) {
                    const { ALUCTR, MATECVE, CALIFIC } = calificacion;
                    
                    // Consulta para insertar o actualizar los registros de calificaciones
                    const query = `
                        INSERT INTO calificaciones (control_estudiante, clave_asignatura, calificacion)
                        VALUES (?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                        calificacion = VALUES(calificacion)
                    `;

                    // Ejecutar la consulta
                    await new Promise((resolveQuery, rejectQuery) => {
                        connection.query(query, [ALUCTR, MATECVE, CALIFIC], (error, results) => {
                            if (error) return rejectQuery(error);
                            resolveQuery(results);
                        });
                    });
                }

                connection.end();
                resolve({ estado: true, mensaje: 'Extracción de calificaciones completada exitosamente.' });
            } catch (error) {
                connection.end();
                resolve({ estado: false, mensaje: 'Error durante la extracción de calificaciones.', error: error.message });
            }
        });
    });
}

module.exports = {
    extraerCalificaciones
};
