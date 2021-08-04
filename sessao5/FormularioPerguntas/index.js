//importando o express
const express = require("express");
//criando uma instancia do express
const app = express();

//***********Database**********************/
//carregando a conexão do banco de dados no arquivo
const connection = require('./database/database');
//testando a conexão, se a conexão ocorrer será executado
//o 'then' e não será executado o 'catch'
//Pode-se comentar pois foi somente para verificar se a conexão estava ocorrendo
connection
        .authenticate()
        .then(()=> {
            console.log('Conexão feita com o banco de dados')
        })
        .catch((msgErro)=>{
            console.log(msgErro);
        });

//importando o model Pergunta para criar a tabela pergunta
//e trabalhar com os dados da tabela, inserindo, alterando, apagando etc.
const Pergunta = require('./database/Perguntas');

//***********EJS**********************/
//estamos setando o ejs para trabalhar no express
app.set('view engine', 'ejs');
//define que o aplicativo usará arquivos estaticos, informando 
//em que pasta eles se estão localizados. Deve-se criar a pasta
app.use(express.static('public'));

//*********************************/
//utilizando o express.urlencoded
app.use(express.urlencoded({extended:false}));
//configuracao para utilizar os dados do formulário em json
app.use(express.json());
 
//***********Rotas**********************/
//utilizando parâmetros e passando para a pagina
app.get('/perguntar', (req, res)=>{

    res.render('perguntar');
});

//rota da pagina principal
app.get('/',(req,res)=>{
    res.render('index');
});

//rota que irá receber os dados do formuláro enviados 
//via post e irá salvar no banco de dados
app.post('/salvarpergunta',(req,res)=>{
    //recebendo os dados do formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //estamos utilizando a constante Pergunta que foi importada anteriormente
    //e carrega o model da tabela perguntas
    //após a pergunta ser salva no bd o usuário será redirecionado para a página principal
    Pergunta.create({
        titulo:titulo, 
        descricao: descricao
        }).then(()=> {res.redirect('/')});
});

//rodando a aplicação
app.listen(8080,()=>{
    console.log("App rodando");
} );