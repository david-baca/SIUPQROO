const fs = require('fs');
const path = require('path');
const dbf = require('dbf-reader'); // Supongamos que usamos una biblioteca para leer archivos DBF
const mysql = require('mysql');

// Función para extraer datos de estudiantes
async function extraerEstudiantes() {
    const archivo = path.join(__dirname, 'DBF', 'DALUMN.dbf');

    // Verificar si el archivo existe
    if (!fs.existsSync(archivo)) {
        return { estado: false, mensaje: 'El archivo DALUMN.dbf no existe.' };
    }

    // Leer el archivo DBF
    let estudiantes;
    try {
        estudiantes = dbf.readSync(archivo);
    } catch (error) {
        return { estado: false, mensaje: 'Error al leer el archivo DALUMN.dbf.', error: error.message };
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
                for (const estudiante of estudiantes) {
                    const { ALUCTR, ALUNOM, ALUAPP, ALUAPM } = estudiante;
                    
                    // Consulta para insertar o actualizar los registros de estudiantes
                    const query = `
                        INSERT INTO estudiantes (control, nombre, apellido_paterno, apellido_materno)
                        VALUES (?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                        nombre = VALUES(nombre),
                        apellido_paterno = VALUES(apellido_paterno),
                        apellido_materno = VALUES(apellido_materno)
                    `;

                    // Ejecutar la consulta
                    await new Promise((resolveQuery, rejectQuery) => {
                        connection.query(query, [ALUCTR, ALUNOM, ALUAPP, ALUAPM], (error, results) => {
                            if (error) return rejectQuery(error);
                            resolveQuery(results);
                        });
                    });
                }

                connection.end();
                resolve({ estado: true, mensaje: 'Extracción de estudiantes completada exitosamente.' });
            } catch (error) {
                connection.end();
                resolve({ estado: false, mensaje: 'Error durante la extracción de estudiantes.', error: error.message });
            }
        });
    });
}

module.exports = {
    extraerEstudiantes
};
