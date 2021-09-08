var victor = {
    nome: "Victor Lima",
    empresa: "Guia do programador",
    salario: 1000
}

var david = {
    nome:"David",
    empresa:"Umbler",
    salario: 800
}

var erik ={
    nome:"Erik Fig",
    empresa:"Udemy",
    salario: 500
}

var users = [victor, david, erik];

//localizando com o find
var usuario = users.find(user => user.nome === "Victor Lima")
var salario = users.find(user => user.salario < 800)

console.log(usuario)
console.log(salario)