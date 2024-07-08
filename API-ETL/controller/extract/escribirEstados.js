const fs = require('fs');
const path = require('path');

// Función para escribir en el archivo de estado
async function writeEstado(filePath, mjs) {
    const fullPath = path.join(__dirname, '../estado', filePath);

    // Verificar si el directorio existe y crear si no existe
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    // Agregar mensaje
    fs.appendFileSync(fullPath, mjs+'\n');
}

module.exports = writeEstado;
