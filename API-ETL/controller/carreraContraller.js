const Carreras = require('../model/Carreras');

exports.getAllCarrera = async (req, res) => {
    try {
        const carrera = await Carreras.findAll();
        res.status(200).json(carrera);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCarreraById = async (req, res) => {
    try {
        const carrera = await Carreras.findByPk(req.params.id);
        if (carrera) {
            res.status(200).json(carrera);
        } else {
            res.status(404).json({ message: 'Carrera no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
