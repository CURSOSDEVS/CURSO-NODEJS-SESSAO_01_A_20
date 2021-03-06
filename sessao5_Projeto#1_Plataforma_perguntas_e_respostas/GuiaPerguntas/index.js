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
app.get('/', (req, res)=>{

    res.render('index');
});

//rodando a aplicação
app.listen(8080,()=>{
    console.log("App rodando");
} );