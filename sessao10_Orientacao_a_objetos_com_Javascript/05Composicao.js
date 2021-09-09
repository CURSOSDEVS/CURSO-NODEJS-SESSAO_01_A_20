class Leitor{
    Ler(caminho){
        return "Conteúdo do arquivo!"
    }
}

class Escritor{
    Escrever(arquivo,conteudo){
        console.log("Conteúdo escrito");
    }
}

class Criador{
    Criar(nome){
        console.log("Arquivo criado!")
    }
}

class Destruidor{
    Deletar(nome){
        console.log("Deletando arquivo!")
    }
}

class ManipuladorDeArquivo{
    constructor(nome){
        this.arquivo = nome;
        this.leitor = new Leitor();
        this.escritor = new Escritor();
        this.criador = new Criador();
        this.destruidor = new Destruidor();
    }
}

var manipulador = new ManipuladorDeArquivo("Meuarquivo.txt");

manipulador.leitor.Ler();
manipulador.escritor.Escrever();
manipulador.criador.Criar();
manipulador.destruidor.Deletar();

//utilizando composição
class GerenciadorDeUsuarios{
    constructor(){
        this.criador = new Criador();
        this.escritor = new Escritor();
    }

    SalvarListaDeUsuarios(lista){
        this.criador.Criar("usuarios.txt");
        this.escritor.Escrever("usuarios.txt",lista);
    }
}

var usuarios = new GerenciadorDeUsuarios(["Victor","Lima"]);