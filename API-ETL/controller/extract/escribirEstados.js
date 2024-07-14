const fs = require('fs').promises;
const path = require('path');

// Función asíncrona para escribir en el archivo de estado
async function writeEstado(filePath, mjs) {
    try {
        const fullPath = path.join(__dirname, '../../estado', filePath);
        // Verificar si el directorio existe y crear si no existe
        const dir = path.dirname(fullPath);
        await fs.mkdir(dir, { recursive: true });

        // Agregar mensaje
        await fs.appendFile(fullPath, mjs + '\n');
    } catch (err) {
        console.error('Error al escribir en el archivo de estado:', err);
        throw err; // Propagar el error para manejarlo en el contexto adecuado
    }
}

module.exports = writeEstado;

