//importando o express
const express = require("express");
//criando uma instancia do express
const app = express();

//estamos setando o ejs para trabalhar no express
app.set('view engine', 'ejs');

//criando rota principal da aplicação
app.get('/', (req, res)=>{
    res.render('principal/perfil');
});

//rodando a aplicação
app.listen(8080,()=>{
    console.log("App rodando");
} );