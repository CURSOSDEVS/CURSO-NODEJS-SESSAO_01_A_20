var nome = "Victor Lima";
var idade = 20;

var empresa = {
    nome:"Guia do programador",
    cidade: "São Paulo",
    site: "guiadoprogramador.com",
    email:"guiadoprogramador.com.br"
}

var user = {
    nome,
    idade,
    empresa
}

console.log(user);

//utilizando o operador spread
var user = {
    nome,
    idade,
    ...empresa //só será copiado os campos do objeto e não o objeto em si
}

console.log(user);