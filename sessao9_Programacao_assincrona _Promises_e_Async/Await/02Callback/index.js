var tempo1 = 6000;
var tempo2 = 8000;

setTimeout(() => {
    console.log("Meu nome é Victor");
},tempo1);

function enviarEmail(corpo, para,callback){
    setTimeout(() => {
        console.log(`
        Para:${para}
        ------------------------
        ${corpo}
        ------------------------
        De: Victor Lima`);
        callback("Ok",5,tempo2);
    }, tempo2);
}

enviarEmail("Oi, seja bem vindo ao Guia","victor@udemy.com",(status, amount, time)=>{
    console.log("Olá isso é um callback");
    console.log("Ele acaba de ser executado");
    console.log(`
    Status: ${status}
    ------------------
    Pessoas: ${amount}
    ------------------
    Tempo envio: ${time}`);
});

console.log("Seu email foi enviado, deve chegar em minutos");
    console.log("TUDO OK!");
