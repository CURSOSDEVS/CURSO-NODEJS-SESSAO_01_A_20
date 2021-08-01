//importando e carregando o módulo express
const express = require("express");
//criando instancia do express
const app = express();

//iniciando o servidor
app.listen(4000, function(erro)
{
    if(erro)
    {
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com sucesso!");
    }
})

    