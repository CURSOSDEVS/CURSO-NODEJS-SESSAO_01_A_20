//importanto o sequelize
const Sequelize = require('sequelize');
//importando a conexão do banco de dados
const connection = require('../database/database');


//definindo o model da tabela artigos
const User = connection.define('users',{
    mail:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});


//sincronizando ou atualizando ou criando a tabela no banco de dados deve-se comentar este código assim
//que a tabela for criada no banco de dados
//User.sync({force:true});

//exportando o model Article
module.exports = User;