//importando o express
const express = require("express");
//criando uma instancia do express
const app = express();
//carregando a conexão no arquivo
const connection = require('./database/database');

//***********Database**********************/
//testando a conexão, se a conexão ocorrer será executado
//o 'then' e não será executado o 'catch'
connection
        .authenticate()
        .then(()=> {
            console.log('Conexão feita com o banco de dados')
        })
        .catch((msgErro)=>{
            console.log(msgErro);
        })

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

//rota que irá receber os dados do formuláro enviados via post
app.post('/salvarpergunta',(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! Título: "+titulo+" Descrição: "+descricao);
});

//rodando a aplicação
app.listen(8080,()=>{
    console.log("App rodando");
} );