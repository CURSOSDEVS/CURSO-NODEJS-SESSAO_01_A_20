
function enviarEmail(corpo, para,callback){
    setTimeout(() => {
        var deuErro = true;

        if(deuErro){
            callback(12,"O venvio do email falhou :(");
        }else{
            callback(12,);
        }
    }, 2000);
}

enviarEmail("Oi, seja bem vindo ao Guia","victor@udemy.com", (time, erro)=>{
        if(erro === undefined){
            console.log("Tudo OK!");
            console.log(`Tempo: ${time} s`);
        }else{
            console.log("Ocorreu erro: "+ erro);
            console.log(`Tempo: ${time} s`)
        }
});
