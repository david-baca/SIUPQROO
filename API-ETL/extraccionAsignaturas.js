const fs = require('fs');
const path = require('path');
const dbf = require('dbf-reader'); // Supongamos que usamos una biblioteca para leer archivos DBF
const mysql = require('mysql');

// Función para extraer datos de asignaturas
async function extraerAsignaturas() {
    const archivo = path.join(__dirname, 'DBF', 'DMATER.dbf');

    // Verificar si el archivo existe
    if (!fs.existsSync(archivo)) {
        return { estado: false, mensaje: 'El archivo DMATER.dbf no existe.' };
    }

    // Leer el archivo DBF
    let asignaturas;
    try {
        asignaturas = dbf.readSync(archivo);
    } catch (error) {
        return { estado: false, mensaje: 'Error al leer el archivo DMATER.dbf.', error: error.message };
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
                for (const asignatura of asignaturas) {
                    const { MATECVE, MATENOM } = asignatura;
                    
                    // Consulta para insertar o actualizar los registros de asignaturas
                    const query = `
                        INSERT INTO asignaturas (clave, nombre)
                        VALUES (?, ?)
                        ON DUPLICATE KEY UPDATE
                        nombre = VALUES(nombre)
                    `;

                    // Ejecutar la consulta
                    await new Promise((resolveQuery, rejectQuery) => {
                        connection.query(query, [MATECVE, MATENOM], (error, results) => {
                            if (error) return rejectQuery(error);
                            resolveQuery(results);
                        });
                    });
                }

                connection.end();
                resolve({ estado: true, mensaje: 'Extracción de asignaturas completada exitosamente.' });
            } catch (error) {
                connection.end();
                resolve({ estado: false, mensaje: 'Error durante la extracción de asignaturas.', error: error.message });
            }
        });
    });
}

module.exports = {
    extraerAsignaturas
};
