const fs = require('fs');
const path = require('path');
const dbf = require('dbf-reader'); // Supongamos que usamos una biblioteca para leer archivos DBF
const mysql = require('mysql');

// Función para extraer datos de profesores
async function extraerProfesores() {
    const archivo = path.join(__dirname, 'DBF', 'DBPERSO.dbf');

    // Verificar si el archivo existe
    if (!fs.existsSync(archivo)) {
        return { estado: false, mensaje: 'El archivo DBPERSO.dbf no existe.' };
    }

    // Leer el archivo DBF
    let profesores;
    try {
        profesores = dbf.readSync(archivo);
    } catch (error) {
        return { estado: false, mensaje: 'Error al leer el archivo DBPERSO.dbf.', error: error.message };
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
                for (const profesor of profesores) {
                    const { PERNOM, PERAPP, PERAPM } = profesor;
                    
                    // Consulta para insertar o actualizar los registros de profesores
                    const query = `
                        INSERT INTO profesores (nombre, apellido_paterno, apellido_materno)
                        VALUES (?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                        nombre = VALUES(nombre),
                        apellido_paterno = VALUES(apellido_paterno),
                        apellido_materno = VALUES(apellido_materno)
                    `;

                    // Ejecutar la consulta
                    await new Promise((resolveQuery, rejectQuery) => {
                        connection.query(query, [PERNOM, PERAPP, PERAPM], (error, results) => {
                            if (error) return rejectQuery(error);
                            resolveQuery(results);
                        });
                    });
                }

                connection.end();
                resolve({ estado: true, mensaje: 'Extracción de profesores completada exitosamente.' });
            } catch (error) {
                connection.end();
                resolve({ estado: false, mensaje: 'Error durante la extracción de profesores.', error: error.message });
            }
        });
    });
}

module.exports = {
    extraerProfesores
};
