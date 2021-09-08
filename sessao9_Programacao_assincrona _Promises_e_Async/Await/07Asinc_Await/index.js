//ASINC/AWAIT deve ser utilizado somente quando será
//retornado um dado ou valor

function pegarUsuario(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve([
                {name: "Victor",lang: "JS"},
                {name: "Lima", lang:"C#"},
                {name: "Daniel", lang:"Java"}
            ])
        },3000);        
    })
}

/*é identico ao utilizado abaixo
pegarUsuario().then(usuario=>{
    console.log(usuario);
})*/

async function principal(){
    var usuarios = await pegarUsuario();
    console.log(usuarios);
    console.log("Olá!");
}

principal();
