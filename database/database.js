const Sequilize = require('sequelize');

const connection = new Sequilize ('guiaPerguntas', 'root', 'miguel123', {
    host: 'localhost',
    dialect: 'mysql'  // nome Bd, usuario, sennha, servidor, qual tipo de banco.
});

module.exports = connection;