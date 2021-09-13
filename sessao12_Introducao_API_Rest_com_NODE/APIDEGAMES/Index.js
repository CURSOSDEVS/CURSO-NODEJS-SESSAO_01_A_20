//importando as bibliotecas
const express = require("express");
const bodyParser = require("body-parser");

//criando o app
const app = express();

//inicando o express com configuração básica
app.use(express.urlencoded({extended:false}));
app.use(express.json());

var DB = {
    games:[
        {
            id:23,
            title: "call of duty MW",
            year: 2019,
            price:60
        },
        {
            id:65,
            title: "Sea of thieves",
            year: 2018,
            price:40
        },
        {
            id:2,
            title: "Minecraft",
            year: 2012,
            price:20
        }
    ]
}

/**primeira rota no primeiro end point que deverá listar todos
 * os games do sistema
 */
app.get('/games',(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});

/**rota para devolver ao usuário o game pelo ID */
app.get('/game/:id',(req,res)=>{
   
    //tratando o id verificando se é numero 
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        
        var game = DB.games.find( game =>  game.id == id );
        
        if(game != undefined){
            res.statusCode= 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

/**novo endpoint para cadastrar um novo game */
app.post('/game',(req,res)=>{
    /* isso dá o mesmo resultado da destruct
    var title = req.body.title;
    var year = req.body.year;
    var price = req.body.price;*/
    //utilizando a destruct para facilitar a manipulação de dados
    var {title, year, price} = req.body;

    //o ideal é validar todos os dados conforme as regras no negocio 
    //e retornar o status code 400 caso não se enquadre nas regras
    
    //utilizando o método push que serve para adicionar dados dentro de um array
    DB.games.push({
        id:2323,
        title,
        year,
        price
    })

    //retornando o status
    res.sendStatus(200);
});

/**novo endpoint para deletar um jogo */
app.delete('/game/:id',(req,res)=>{
    /**validação */
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{        
        var id = parseInt(req.params.id);

        /**se o index for 0 ou outro numero ele existe 
         * se for -1 ele não existe
         */
        var index = DB.games.findIndex( g=> g.id == id);
        
        if(index == -1){
            res.sendStatus(404);
        }else{
            /**utiliza-se splice para deletar um registro
             * em um array. Os parâmetros são o indice do elemento
             * que será apagao e a quantidade de itens que serão 
             * apagados apartir deste indice
             */
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

/**endpois para edição de registros será criado uma rota 
 * utilizando o PUT
 */
app.put('/game/:id',(req,res)=>{
    /**validação */
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{        
        var id = parseInt(req.params.id);

        /**localiza o jogo pelo id
         */
        var game = DB.games.find( g=> g.id == id);
        
        if(game != undefined){
            //peqando os dados que estão na requisição
            var {title, price, year} = req.body;

            /** ideal é fazer as validações conforme a regra
             * do negócio
             */
            if(title !=undefined){
                game.title = title;
            }

            if(price !=undefined){
                game.price = price;
            }

            if(year !=undefined){
                game.year = year;
            }

            res.sendStatus(200);

        }else{
             res.sendStatus(404); 
        }
    }
});


app.listen(45678,()=>{
    console.log("API rodando");
});


