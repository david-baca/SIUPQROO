const Usuarios = require('../model/Usuarios');
const Directores = require('../model/Directores');
const SecretariosAcademicos = require('../model/SecretariosAcademicos');
const Administradores = require('../model/Administradores');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Realizar la consulta con join
        const usuarios = await Usuario.findAll({
            include: Perfil
        });

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Usuarios');

        // Definir las columnas
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'nombre', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Biografía', key: 'biografia', width: 30 },
            { header: 'Avatar', key: 'avatar', width: 30 }
        ];

        // Agregar filas con los datos de los usuarios
        usuarios.forEach(usuario => {
            worksheet.addRow({
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                biografia: usuario.Perfil?.biografia || '',
                avatar: usuario.Perfil?.avatar || ''
            });
        });

        // Configurar la respuesta HTTP para la descarga del archivo
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');

        // Enviar el archivo Excel
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error al generar el archivo Excel:', error);
        res.status(500).send('Error al generar el archivo Excel');
    }
};