//importando o express
const express = require("express");
//criando uma instancia do express
const app = express();

//estamos setando o ejs para trabalhar no express
app.set('view engine', 'ejs');

//define que o aplicativo usará arquivos estaticos, informando 
//em que pasta eles se estão localizados. Deve-se criar a pasta
app.use(express.static('public'));
 
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
    res.send("Formulário recebido!");
});

//rodando a aplicação
app.listen(8080,()=>{
    console.log("App rodando");
} );