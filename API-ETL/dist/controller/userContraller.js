const { Usuarios, Directores, SecretariosAcademicos, Administradores } = require('../model/index'); 
// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const user = await Usuarios.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Usuarios.findAll({
            include: [{
                model: Administradores,
                as: 'Administradores'
            }]
        });
        const nonAdminUsers = users.filter(user => user.Administradores.length === 0);
        res.status(200).json(nonAdminUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Usuarios.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserByCorreo = async (req, res) => {
    try {
        const request = {};
        const user = await Usuarios.findOne({ where: { correo: req.params.correo } });
        if (user) {
            const director = await Directores.findOne({where: { fk_Usuario : user.pk } })
            const secre = await SecretariosAcademicos.findOne({where: { fk_Usuario : user.pk } })
            const admin = await Administradores.findOne({where: { fk_Usuario : user.pk } })
            request.user = user;
            if(director){request.rol = "director"; request.fk_Carrera = director.fk_Carrera}
            if(secre){request.rol = "secretario";}
            if(admin){request.rol = "administrador";}
            res.status(200).json(request);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await Usuarios.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await Usuarios.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo director de carrera
exports.createDirect = async (req, res) => {
    try {
        const direct = await Directores.create(req.body);
        res.status(201).json(direct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDirectByIdUser = async (req, res) => {
    try {
        const direct = await Directores.findOne({ where: { fk_Usuario: req.params.id } });
        if (direct) {
            res.status(200).json(direct);
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDirectByIdUser = async (req, res) => {
    try {
        const direct = await Directores.findOne({ where: { fk_Usuario: req.params.id } });
        if (direct) {
            await direct.destroy();
            res.status(204).json({ message: 'Director eliminado' });
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo Secretario Académico
exports.createSecreAcad = async (req, res) => {
    try {
        const secre = await SecretariosAcademicos.create(req.body);
        res.status(201).json(secre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSecreAcadByIdUser = async (req, res) => {
    try {
        const secre = await SecretariosAcademicos.findOne({ where: { fk_Usuario: req.params.id } });
        if (secre) {
            res.status(200).json(secre);
        } else {
            res.status(404).json({ message: 'Secretario Académico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSecreAcadByIdUser = async (req, res) => {
    try {
        const secre = await SecretariosAcademicos.findOne({ where: { fk_Usuario: req.params.id } });
        if (secre) {
            await secre.destroy();
            res.status(204).json({ message: 'Secretario Académico eliminado' });
        } else {
            res.status(404).json({ message: 'Secretario Académico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo Administrador
exports.createAdmin = async (req, res) => {
    try {
        const admin = await Administradores.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAdminByIdUser = async (req, res) => {
    try {
        const admin = await Administradores.findOne({ where: { fk_Usuario: req.params.id } });
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAdminByIdUser = async (req, res) => {
    try {
        const admin = await Administradores.findOne({ where: { fk_Usuario: req.params.id } });
        if (admin) {
            await admin.destroy();
            res.status(204).json({ message: 'Administrador eliminado' });
        } else {
            res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
