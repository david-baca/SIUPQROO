const db = require('../Modelos/database');

exports.getData = (req, res) => {
  const sql = 'SELECT * FROM tabla';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
};

exports.addData = (req, res) => {
  const newData = req.body;
  const sql = 'INSERT INTO tabla SET ?';
  db.query(sql, newData, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Datos agregados correctamente');
  });
};
