//carregando o sequelize na constante Sequelize
const Sequelize = require('sequelize');

/**
 * criando a conexão com  o sequealize
 * onde é informado:
 * o nome do banco de dados, 
 * o usuário, 
 * a senha do usuário
 * um json com o local onde está o banco de dados e o tipo de banco de dados
 * */
 
const connection = new Sequelize('guiaperguntas','root','root',{
    host: 'localhost',
    dialect: 'mysql' //
});

module.exports = connection;
