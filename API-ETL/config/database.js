const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('siupqroo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false,
});

module.exports = sequelize;