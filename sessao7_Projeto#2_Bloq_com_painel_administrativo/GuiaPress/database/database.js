//importando o sequelize
const Sequelize = require('sequelize');

/**Criando a connection com os parâmetros: nome do banco de dados,
 * nome do usuário, senha do usuário, e um json com o host e o tipo
 * de banco de dados
 */
const connection = new Sequelize('guiapress','root','123456',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-3:00' //consultar na net
});

module.exports = connection;
