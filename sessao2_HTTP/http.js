//carregando o modulo http na variavel http
var http = require('http');
//criando um servidor
http.createServer(function(requisicao, resposta){
    resposta.end("<h1>Bem vindo ao Site</h1><h4>Guia do programador</h4>");
}).listen(8181);
console.log('Meu servidor está rodando');