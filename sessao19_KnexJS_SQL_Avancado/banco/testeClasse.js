//importa as classes de fabrica de queries 
const FactoryQueries = require('./FactoryQueries');
const database = require('./databaseKnex');
const { Console } = require('console');

async function principal(){
    var data=[
        {
            nome: "ACTIVISIOON",
            game_id: 6
        },
        {
            nome: "BLISART",
            game_id: 6
        },
        {
            nome: "BLISART SOUHT",
            game_id: 6
        }
    ]

    /* 
    var inserido = await FactoryQueries.insert(data,"games");
    console.log(inserido); 
    */

   /* 
    var search1 = await FactoryQueries.select({nome: "nome", preco: "preco"},"games","preco","desc");
    var search1 = await FactoryQueries.select("","games","preco","desc");
    console.log(search1);
    */

    
    /*
    var search2 = await FactoryQueries.where({preco : 120 },"games");
    console.log(search2);  
    */
   
    /*
    var search3 = await FactoryQueries.whereRaw("preco < 140 and preco > 89 or nome = 'GTA'","games");
    console.log(search3);
    */

   /*
    var result = await FactoryQueries.deleteId(18,"games");
    console.log(result); 
    */

   /*
    var editado = await FactoryQueries.editId(3, {nome: 'Call of duty Black ops', preco: 143}, "games");
    console.log(editado); 
    */
   
    //inerindo valores na tabela estudio
    /*  var inserirEstudio = await FactoryQueries.insert(data,"estudios");
      console.log(inserirEstudio);
    */

    //realizando um join entre duas tabelas 
    
   //var innerJoinGames = await FactoryQueries.innerJoinFields(["games.id as game_id","estudios.id as estudio_id","games.nome as game_nome","estudios.nome"],"games","estudios","estudios.game_id","games.id");
    //var innerJoinGames = await FactoryQueries.innerJoinFields(["games.*","estudios.nome as estudio_nome"],"games","estudios","estudios.game_id","games.id");
   // var data = innerJoinGames;

   /* console.log(innerJoinGames);
    
    var game =  {
        id : 0,
        nome : "",
        estudios:[]
    }

    game.id = data[0].id;
    game.nome = data[0].nome;

    data.forEach(estudios=>{
        game.estudios.push({estudio: estudios.estudio_nome})
    })
    
    console.log(game);*/
   
    //outro exemplo
    /*
    var innerJoinGames = await FactoryQueries.innerJoinFields(["games.*","estudios.nome as estudio_nome"],"games","estudios","estudios.game_id","games.id");
    console.log(innerJoinGames);
    */

    /**Exemplo de inneJoinMultiTables*/
    try {
        var busca = await FactoryQueries.innerJoinMultTables("estudios.nome as estudio","games.nome as game","games.preco","games.id","games.preco","games_estudios",
        "games","games.id","games_estudios.game_id","estudios","estudios.id","games_estudios.estudio_id","games.id = 4");
        console.log(busca);
    } catch (error) {
        Console.log(error);
    }
 
}

principal();
/*
 database.select("estudios.nome as estudio", "games.nome as game","games.preco").table("games_estudios")
                        .innerJoin("games","games.id","games_estudios.game_id")
                        .innerJoin("estudios","estudios.id","games_estudios.estudio_id")
                        .whereRaw("estudios.nome = 'Rock Star'")
                        .then(result=>{
                              console.log(result);  
                                return result;
                        }).catch(err=>{
                            console.log(err);
                        })
*/

/**Exemplo de utilização de transactions */
async function testTransactions() {  
    try {
        await FactoryQueries.insert({nome: "Qualquer Estúdio"},"estudios");
        await FactoryQueries.insert({nome: "Pyxerelia"},"estudios");
        await FactoryQueries.insert({nome: "Mojang"},"estudios");
        await FactoryQueries.insert({nome: "Gearbox"},"estudios");
    } catch (erro) {
        console.log(erro);
    }
}

testTransactions();


