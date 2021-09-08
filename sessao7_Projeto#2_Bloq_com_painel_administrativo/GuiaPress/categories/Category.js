//importanto o sequelize
const Sequelize = require('sequelize');
//importando a conexão do banco de dados
const connection = require('../database/database');

//definindo o model da tabela categorias
const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
        //slug é o titulo formatado para url
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//sincronizando ou atualizando ou criando a tabale no banco de dados deve-se comentar este código assim
//que a tabela for criada no banco de dados
//Category.sync({force:true});

//exportando o model Category
module.exports = Category;