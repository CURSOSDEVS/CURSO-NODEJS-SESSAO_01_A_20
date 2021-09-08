var calculadora = require('./calculadora.js');

var mostrarSite = true;
const site = "www.guiadoprogramador.com"

console.log("Hello mundo!");
console.log("Meu nome é Claudisnei");

if(mostrarSite) //se mostrar print o site
{
    console.log(site);
}

console.log('Soma = '+ calculadora.soma(10,20));
var resultado = calculadora.mult(10,20);
var resultadoSub = calculadora.sub(20,40);
console.log('Mult = ' + resultado);
console.log('Sub = ' + resultadoSub);
console.log(calculadora.div(20,3));
console.log(calculadora.div(0,10));
console.log("Nome da calculadora = " + calculadora.nome);