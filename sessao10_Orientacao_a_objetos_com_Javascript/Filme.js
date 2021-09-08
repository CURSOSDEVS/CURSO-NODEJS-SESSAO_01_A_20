class Filme{

    constructor(){
        this.titulo= '';
        this.ano = 2000;
        this.genero = '';
        this.sinopse = '';
        this.diretor = '';
        this.atores = [];
        this.duracao = 0
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

var vingadores = new Filme();
vingadores.titulo = "Vingadores 2";
vingadores.ano = 2014;
vingadores.genero = 'Ação';

console.log(`
Titulo: ${vingadores.titulo}
Ano: ${vingadores.ano}
Genero: ${vingadores.genero}`);