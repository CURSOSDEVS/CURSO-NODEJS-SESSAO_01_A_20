const fs = require("fs");

function modificarUsuario(nome,curso,categoria){
    fs.readFile("./ArquivoJSON.json",{encoding:'utf-8'},(erro,dados)=>{
        if(erro){
            console.log("Ocorreu um erro");
        }else{
            console.log(dados);
    
            //convertendo o texto em objeto javascript
            var conteudo = JSON.parse(dados);
    
            //alterando os campos do jason
            conteudo.nome = nome;
            conteudo.curso = curso;
            conteudo.categoria = categoria
            console.log(conteudo);
    
            //alterando os dados dentro do arquivo JSON
            //convertendo de objeto javascript  para texto
            fs.writeFile("./ArquivoJSON.json", JSON.stringify(conteudo),(erro)=>{
                if(erro){
                    console.log("Deu erro :(")
                }else{
                    console.log("JSON gravado");
                }
            });
        }
    });
}

modificarUsuario("joão","NodeJS","Node");