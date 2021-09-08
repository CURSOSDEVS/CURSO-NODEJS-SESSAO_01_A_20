function enviarEmail(corpo, para){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            
            var deuErro = true;

            if(!deuErro){
                resolve() //promessa Ok
            }else{
                reject() //Foi mal deu erro
            }

        },4000);
    });
}

enviarEmail("Olá mundo","victor@udemy.com").then(()=>{
    console.log("Opa, você conseguiu cumprimr sua promessa");
}).catch(()=>{
    console.log("Que pena não deu");
});