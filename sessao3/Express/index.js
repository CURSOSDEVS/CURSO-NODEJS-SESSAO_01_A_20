//importando e carregando o módulo express
const express = require("express");
//criando instancia do express
const app = express();

//chamando o aplicativo e criando uma rota inicial e 
//definindo oque éla irá fazer
app.get("/", function(req, res){
    //enviando resposta, OBS: só podemos enviar a resposta
    //uma vez se não a conexão irá se fechar.
    res.send("Bem vindo ao guia do programador.");
} );

//criando uma rota para o blog
/*app.get("/Blog", function(req, res){
    res.send("<h1>Bem vindo ao meu Blog!.</h1>");
});*/

//criando uma rota para acessar o canal
app.get("/canal/youtube", function(req, res){
    res.send("<h1>Bem vindo ao meu canal!</h1>");
});

//criando rota utilizando parâmetros
//req são os dados enviados pelo usuário
//res é a resposta que será enviana ao usuário
app.get("/ola/:nome/:empresa", function(req, res){
    var nome = req.params.nome;
    var empresa = req.params.empresa;

    res.send("<h1>Oi "+ nome +" empregado da "+ empresa +"</h1>");
});

//parâmetros não obrigatórios basta informar o sinal de 
//interrogação 
app.get("/blog/:artigo?", function(req, res){
    var artigo = req.params.artigo;
    if(!artigo){
        res.send("<h1>Bem vindo ao meu Blog!</h1>");
    }else{
        res.send("<h1>Bem vindo ao meu Blog de "+artigo+"!</h1>");
    }
    
});

//iniciando o servidor
app.listen(4000, function(erro)
{
    if(erro)
    {
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})

    