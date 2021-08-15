var somafuncao = require('./soma.js');

var nome = 'Calculadora v.1';

function mult(a,b)
{
    return a * b;
}

function div(a,b)
{
    if(a > 0){
        return a / b;
    }else
    {
        return 'Divisor menor que zero';
    }
}

function sub(a,b)
{
    return a-b;
}

function soma(a,b)
{
    return a + b;

}

module.exports = {
    soma,
    mult,
    div,
    sub,
    nome
}

