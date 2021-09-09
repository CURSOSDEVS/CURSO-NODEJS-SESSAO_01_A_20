// modulo fs serve para manipular arquivos
const fs = require("fs");

//ler o arquivo
fs.readFile("./arquivotexto.txt",{encoding:'utf-8'},(erro, dados)=>{
    if(erro){
        console.log("Ocorreu uma falha durante a leitura do arquivo!");
    }else{
        console.log(dados);
    }
});

//escrever no arquivo
fs.writeFile("./arquivotexto.txt","Novo conteúdo do arquivo",(erro)=>{
    if(erro){
        console.log("Erro durante escrita do arquivo2");
    }
});