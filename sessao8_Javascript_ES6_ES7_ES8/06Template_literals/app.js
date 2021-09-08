var nome ="Victor Lima";
var sobre = "Fundador da Guia do programador";

//sem o uso de literals
var frase = "Olá meu nome é " + nome + " e eu sou "+ sobre +".";

//com o uso de literals
var frase2 = `Utilizando literals:

            Olá meu nome é 

                ${nome } 
                
                e eu sou 
                
                ${sobre}`;

console.log(frase)
console.log(frase2)