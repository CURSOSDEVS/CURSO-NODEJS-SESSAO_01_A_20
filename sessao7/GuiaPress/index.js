//importando o express
const express = require('express');

//criando instância
const app = express();

//importando a biblioteca de sessoes
const session = require('express-session');

//configurando o gerenciamento de sessões
app.use(session({
    //texto utilizado para aumetar a segurança das sessões
    secret:"qualquerPalavra",
    //cookie é uma referencia para sessão no servidor
    //pode-se setar o tempo de uma sessão pela 
    //propriedade maxAge que é em milisegundos ou 
    //seja cada segundo e 1000 milisegundo
    cookie: {maxAge: 7200000} //duas horas de sessão
    //o historage usado do express-session por padrão é a memória ram
    //em um projeto de escala maior o idel é utilizar o Redis que
    //é um banco de dados proprio para armazenamento de sessões
}));

//exemplo rota para criar a sessão
app.get('/session',(req,res)=>{
    //criando informações da sessão
    req.session.treinamento = "Formação Node.js"
    req.session.ano = 2019
    req.session.email = 'claudisnei@teste'
    req.session.user = {
        username: 'claudisnei',
        email: 'email@qualquer',
        id:'10'
    }
    //resposta da rota
    res.send('Sessão gerada');
});

//exemplo de rota para ler a sessão
app.get('/leitura',(req,res)=>{
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user
    })
});

//importando as rotas dos controllers
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

/**BANCO DE DADOS *************************/
//importando a conexão com o banco de dados
const connection = require('./database/database');

//importando os models
const Category = require('./categories/Category');
const Article = require('./articles/Article');
const User = require('./users/User');

/***************************************** */

//realizando a autenticação com o banco de dados
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso!");
    }).catch((error)=>{
        console.log(error);
    });
/***************************************** */

//dizer para a aplicação utilizar o controller que foi importado
//e poder acessar as rotas que estão definidas no controller
app.use('/',categoriesController);
app.use('/',articlesController);
app.use('/',usersController);

/***************************************** */
//configurando a view engine
app.set('view engine', 'ejs');

//define que o aplicativo usará arquivos estaticos, informando 
//em que pasta eles se estão localizados. Deve-se criar a pasta
app.use(express.static('public'));

//criando rota para mostrar a página principal com todos os artigos 
//cadastrados
app.get('/',(req,res)=>{
    Article.findAll({        
        order:[['id','DESC']],
        //limitamos a exibição em quatro elementos na página
        limit: 4
        }).then(articles=>{
            if(articles != undefined){
                /*localizando as categorias que serão passadas
                para a homenavbar da página*/
                Category.findAll().then(categories=>{
                    res.render('index',{articles:articles, categories:categories});
                });                
            }       
        });
});

//rota que irá abrir o artigo selecionado na pagina principal
//na página de leitura do artigo
app.get('/:slug',(req, res)=>{
    var slug = req.params.slug;
    //
    Article.findOne({
        where: {slug:slug}
    }).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article",{article:article, categories:categories});
            });
        }else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});

/*criando rota para carrega 
somente os artigos de uma categoria específica*/
app.get('/category/:slug',(req,res)=>{
    
    var slug = req.params.slug;

    Category.findOne({
        where: {slug:slug},
        //aqui é onde serão adicionados todos os artigos que pertencem 
        //a categoria procurada
        include:[{model:Article}]
    }).then(category =>{
        if(category != undefined){
            //será enviado tambem todas as categorias que serao
            //utilizadas para comport a homenavbar
            Category.findAll().then(categories=>{
                if(categories != undefined){
                    //será enviado também a variavel category que
                    //passará o titulo para o texto da página
                    //articlesCategory
                    res.render('articlesCategory',{articles:category.articles, categories:categories, category:category })
                }else{
                    res.redirect('/');
                }
            });
        }else{
            res.redirect('/');
        }
        
    });

});

//iniciando a aplicação
app.listen(8080,()=>{
    console.log("O servidor está rodando!");
});