const database = require("./database");



//criando os dados que serão inseridos na tabela
/*
var dados = [
    {
        nome: "Call of duty",
        preco: 76.34
    },
    {
        nome: "Call of duty 2",
        preco: 98.34
    },
    {
        nome: "GTA",
        preco: 60
    },
    {
        nome: "WOW",
        preco: 120
    }
]
*/
//criando o query com o query buider para inserir os dados 
//salva essa query em uma variavel somente para teste e visualização
//var query = database.insert(dados).into("games");

//visualizando a query gravada
//console.log(query.toQuery());

/*
//forma correta para salvar no banco de dados
//Realizando insert 
database.insert(dados).into("games").then(game=>{
    console.log(game);
    console.log("Registro salvo com sucesso");
}).catch(err=>{
    console.log("Erro ao salvar no banco de dados: "+ err)
}); */

/*
//realizando um select de todos os registros 
database.select().table('games').then(games=>{
    console.log(games);
}).catch(err=>{
    console.log(err);
}); */

//Função para realizar cadastro em qualquer tabela
function insert(data,table){
    return new Promise((resolve,reject)=>{      
        setTimeout(() => {
            var erro;
            if(data ==undefined || table == undefined){
                erro = "A função possui dois parâmetros e devem ser preenchidos";
            }

            resolve(
                database.insert(data).into(table).then(result=>{
                    console.log("registro inserido :"+ result);
                }).catch(err=>{
                    erro = "Erro na execução: "+ err;
                })            
            )
            if(erro != undefined){
                reject(console.log(erro));
            }
        }, 1000);
    });
}


//SELECT para todos os casos basta adicionar o campo que ser quer localizar
function select(fields,table, orderField=undefined, orderType=undefined){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {

            var erro;            
            
            if(orderField == undefined){
                orderField="id";
            }

            if(orderType == undefined){
                orderType = "asc";
            }

            if(fields==undefined){
                fields= '*';
            }
                resolve(
                    database.select(fields).table(table).orderBy(orderField,orderType).then(result=>{
                    console.log(result)}).catch(err=>{
                        erro = err;
                    })
                )
                if(erro != undefined){
                    reject(console.log(erro));
                }
        }, 1000);
    });
}

//utilizando where
function where(condition,table){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            var erro;

            resolve(
                database.where(condition).table(table).then(result=>{
                    console.log(result);
                }).catch(err=>{
                    erro = err;
                })
            );
            if(erro != undefined){
                reject(console.log(erro));
            }
        }, 1000);
    });
}

//utilizando whereRaw
function whereRaw(condition,table){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            var erro;

            resolve(
                database.whereRaw(condition).table(table).then(result=>{
                    console.log(result);
                }).catch(err=>{
                    erro = err;
                })
            );
            if(erro != undefined){
                reject(console.log(erro));
            }
        }, 1000);
    });
}

//funcão para deletar um registro pelo ID
function deleteId(id,table){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            var erro;
            var jsonId = {id: id};

            resolve(                
                database.where(jsonId).delete().table(table).then((result)=>{
                    if(result == 1){
                        console.log("Registro apagado "+ result);
                    }else{
                        console.log("Registro não existe.")
                    }                
                }).catch(err=>{
                    erro = err;
                })
            )
            if(erro != undefined){
                reject(
                    console.log("Não foi possível apagar o registro")
                )
            }
            
        }, 1000);
    });
}

//função para editar um registro pelo ID
function editId(id,data,table){
    return new Promise((resolve,reject)=>{
        var erro;
        var jsonId = {id: id};

        resolve(
            database.where(jsonId).update(data).table(table).then(result=>{
                console.log("Registro atualizado "+ result)
            }).catch(err=>{
                erro = err;
            })
        )

        if(erro != undefined){
            reject(
                console.log("Erro ao atualizar registro: "+ erro)
            )
        }
    })
}

async function principal(){
    var data=[
        {
            nome: "Assassins creed Vallaha",
            preco: 245
        }
    ]
   // var inserido = await insert(data,"games");
    var search1 = await select({nome: "nome", preco: "preco"},"games","preco","desc");
  //  var search2 = await where({preco : 120 },"games");
  //  var search3 = await whereRaw("preco > 140  or nome = 'GTA'","games")
   // var result = await deleteId(5,"games");
  // var editado = await editId(14, {nome: 'Residente evil 3', preco: 43}, "games");

  // console.log(inserido);
    console.log(search1);
  //  console.log(search2);
  //  console.log(search3);
  //  console.log(result);
  //    console.log(editado);
}

principal();


/*
database.select(["id","preco"]).table('games').then(games=>{
    console.log(games);
}).catch(err=>{
    console.log(err);
});


//realizando um query dentro de outra query
database.insert({nome: "Mists of noyah", preco: 25}).into('games').then(games=>{
    console.log(games);
    database.select().table('games').then(games=>{
        console.log(games);
    }).catch(err=>{
        console.log(err);
    }); 
}).catch(err=>{
    console.log(err);
});

*/
