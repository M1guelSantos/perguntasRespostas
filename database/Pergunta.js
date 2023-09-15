const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false //impede o campo de ficar vazio
    },
    descricao:{
        type: Sequelize.TEXT, //Textos longos
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{}) // Sincronizar com bd, e não vai recriar tabelas.

module.exports = Pergunta;