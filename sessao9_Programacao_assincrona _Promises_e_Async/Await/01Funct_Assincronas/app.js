setTimeout(() => {
    console.log("Meu nome é Victor");
}, 10000);

function enviarEmail(corpo, para){
    setTimeout(() => {
        console.log(`
        Para:${para}
        ------------------------
        ${corpo}
        ------------------------
        De: Victor Lima`);
    }, 8000);
}

enviarEmail("Oi, seja bem vindo ao Guia","victor@udemy.com");
console.log("Seu email foi enviado, deve chegar em minutos");
console.log("Tudo OK!");