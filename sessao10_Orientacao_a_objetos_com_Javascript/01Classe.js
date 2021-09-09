class Filme{

    constructor(titulo,ano,genero,diretor,duracao){
        this.titulo= titulo;
        this.ano = ano;
        this.genero = genero;        
        this.diretor = diretor;        
        this.duracao = duracao
    }

    Reproduzir(){
        console.log("Reproduzindo...");
    }

    Pausar(){

    }

    Avancar(){

    }

    Fechar(){

    }

}

var vingadores = new Filme("Vingadores 2",2014,"Ação","Alguém","2h");

/*
console.log(`
Titulo: ${vingadores.titulo}
Ano: ${vingadores.ano}
Genero: ${vingadores.genero}`);*/

console.log(vingadores);