function enviarEmail(corpo, para){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            
            var deuErro = false;

            if(!deuErro){
                resolve({
                    time:6,
                    to:"victor@udemy.com"
                }) //promessa Ok
            }else{
                reject("Fila cheia") //Foi mal deu erro
            }

        },4000);
    });
}

enviarEmail("Olá mundo","victor@udemy.com").then(({time, to})=>{
    console.log("Opa, você conseguiu cumprimr sua promessa");
    console.log(`
    Time: ${time}
    -------------------
    To:${to}`)
}).catch((erro)=>{
    console.log("Que pena não deu");
    console.log("Ocorreu um erro: "+ erro)
});