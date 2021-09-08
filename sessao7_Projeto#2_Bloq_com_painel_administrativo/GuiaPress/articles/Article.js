//importanto o sequelize
const Sequelize = require('sequelize');
//importando a conexão do banco de dados
const connection = require('../database/database');

//importando o model que fará parte do relacionamento.
const Category = require('../categories/Category');

//definindo o model da tabela artigos
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
        //slug é o titulo formatado para url
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }, body:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

//definindo o relacionamento dizendo que um artigo pertence a uma categoria
//define o relacionamento 1 para 1 no sequelize
Article.belongsTo(Category);

//defininco o relacionamento 1 para muitos, dizendo que uma categoria
//pode ter muitos artigos;
Category.hasMany(Article);

//sincronizando ou atualizando ou criando a tabela no banco de dados deve-se comentar este código assim
//que a tabela for criada no banco de dados
//Article.sync({force:true});

//exportando o model Article
module.exports = Article;