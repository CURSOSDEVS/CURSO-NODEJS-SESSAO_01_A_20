
var user = {
    nome:"Victor Lima",
    prof: "Programador",
    empresa:"Guia do programador",
    curso:"Formação Node.js"
}

var nome = user.nome;
var curso = user.curso;

console.log(nome);
console.log(curso);

//utilizando o destruct para pegar os campos  dentro do 
//jason user
var { nome, prof } = user;


console.log(nome);
console.log(prof);
