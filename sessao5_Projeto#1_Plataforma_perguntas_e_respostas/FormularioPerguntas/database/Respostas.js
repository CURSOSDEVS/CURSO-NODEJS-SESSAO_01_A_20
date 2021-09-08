//importando o sequelize
const Sequelize = require('sequelize');
//importando a conexão com o banco de dados
const connection = require('./database');

const Resposta = connection.define("respostas", {
    corpo: {  //é parte de texto da resposta
        type: Sequelize.TEXT,
        allowNull: false

    } ,
    //campo para armazenar o id da pergunta que será um relacionamento simples com a tabela perguntas
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }

});

Resposta.sync({force: false});

module.exports = Resposta;