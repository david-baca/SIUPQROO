const Periodos = require('../model/Periodo');

exports.getAllPeriodos = async (req, res) => {
    try {
        const periodo = await Periodos.findAll();
        res.status(200).json(periodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};