class Animal{

    constructor(nome, idade, peso){
        this.nome = nome;
        this.idade = idade;
        this.peso = peso
    }

    ChecarEstoque(){
        return 10;
    }
}

class Cachorro extends Animal{

    constructor(nome,idade,preco,cor,raca){
        super(nome,idade,preco)
        this.cor = cor;
        this.raca = raca;
    }


    Latir(){
        console.log("Rolf, Rolf!");
    }

    ChecarEstoque(){
        console.log("Na loja temos 20 dogs");
    }
}

var dog = new Cachorro("Dogão",5,250,"Preto","Pastor Alemão");

console.log(dog.ChecarEstoque());
dog.Latir();
dog.ChecarEstoque();