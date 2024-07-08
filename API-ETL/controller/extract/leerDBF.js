const { Dbf } = require('dbf-reader');
const fs = require('fs');
// Función para leer archivo DBF usando dbf-reader
async function leerDBF(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        const datatable = Dbf.read(buffer);
        return datatable.rows.map(row => {
            const registro = {};
            datatable.columns.forEach(col => {
                if (row[col.name] instanceof Date) {
                    const date = new Date(row[col.name]);
                    date.setMonth(date.getMonth() - 1);
                    registro[col.name] = date;
                } else {
                    registro[col.name] = row[col.name];
                }
            });
            return registro;
        });
    } catch (error) {
        throw new Error('Error al leer el archivo DBF: ' + error.message);
    }
}
module.exports = leerDBF;