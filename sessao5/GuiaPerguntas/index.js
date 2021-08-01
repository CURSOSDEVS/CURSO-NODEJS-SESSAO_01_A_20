//importando o express
const express = require("express");
//criando uma instancia do express
const app = express();

//estamos setando o ejs para trabalhar no express
app.set('view engine', 'ejs');

//define que o aplicativo usará arquivos estaticos, informando 
//em que pasta eles se estão localizados. Deve-se criar a pasta
app.use(express.static('public'));

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

//estrutura de repeticão foreach
var produtos = [
    {nome:'Doritos', preco:3.14},
    {nome:'Coca-Cola', preco:5},
    {nome:'Leite', preco:1.45},
    {nome:'Carne', preco:15},
    {nome:'HeadBull', preco:6.45},

]
    
//utilizando parâmetros e passando para a pagina
app.get('/:nome/:lang', (req, res)=>{
    //variavel que serão mostradas na pagina
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirmsg = false;

    res.render('index',{
        nome: nome,
        lang: lang,
        empresa: 'Guia do programador',
        inscritos: 8000,
        msg: exibirmsg,
        produtos: produtos
    });
});

//rodando a aplicação
app.listen(8080,()=>{
    console.log("App rodando");
} );