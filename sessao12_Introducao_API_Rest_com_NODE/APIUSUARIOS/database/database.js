//importando bibliotecas
const Sequelize = require("sequelize");

//criando a conexão com o banco
const connection = new Sequelize('apigames','root','123456',{
    host:'localhost',dialect:'mysql'
});

module.exports = connection;