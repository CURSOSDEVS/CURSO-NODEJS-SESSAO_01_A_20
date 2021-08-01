//importando o express
const express = require("express");
//criando uma instancia do express
const app = express();

//estamos setando o ejs para trabalhar no express
app.set('view engine', 'ejs');

//criando rota principal da aplicação e passando variaveis
/*app.get('/', (req, res)=>{
    //variavel que serão mostradas na pagina
    var nome = 'Claudisnei';
    var lang = 'Javascript';

    res.render('index',{
        nome: nome,
        lang: lang,
        empresa: 'Guia do programador',
        inscritos: 8000
    });
});*/

//utilizando parâmetros e passando para a pagina
app.get('/:nome/:lang', (req, res)=>{
    //variavel que serão mostradas na pagina
    var nome = req.params.nome;
    var lang = req.params.lang;

    res.render('index',{
        nome: nome,
        lang: lang,
        empresa: 'Guia do programador',
        inscritos: 8000
    });
});

//rodando a aplicação
app.listen(8080,()=>{
    console.log("App rodando");
} );