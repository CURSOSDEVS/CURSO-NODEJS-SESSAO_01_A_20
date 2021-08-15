//importando o sequelize
const Sequelize = require('sequelize');
//importando a conexão com o banco de dados
const connection = require('./database');

//criando o model para a tabela pergunta
const Pergunta = connection.define('perguntas',{
                titulo:{type: Sequelize.STRING,
                        allowNull: false},
                descricao:{type: Sequelize.STRING,
                           allowNull: false}
});

/**criando a tabela com o comando sync, o atributo force
*é para que a tabela não seja recriada caso já exista e o 
atributo .then() é para verificar se a tabela foi criada*/
Pergunta.sync({force:false}).then(()=>{
    console.log('Tabela pergunta criada com sucesso')
});

//exportando o modulo para quem for utilizar.
module.exports = Pergunta;
