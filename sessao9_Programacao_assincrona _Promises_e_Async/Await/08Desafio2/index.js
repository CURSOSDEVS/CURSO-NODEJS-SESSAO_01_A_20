//ASINC/AWAIT deve ser utilizado somente quando será
//retornado um dado ou valor
function pegarId(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(id);
        }, 1500);
    });
}


function buscarEmailNoBanco(id){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            //logica de busca  no banco
            resolve('victorlima@guia.com.br');
        }, 2000);
    });
}

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

        },3000)
    })
}

async function principal(){
    var id = await pegarId(7);
    var email = await buscarEmailNoBanco(id);
    await enviarEmail("Olá, como vai?", email).then(()=>{
        console.log("Email enviado.")
    }).catch(err=>{
        console.log(err)
    })
}

principal();
