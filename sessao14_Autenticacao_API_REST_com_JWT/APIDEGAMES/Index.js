//importando as bibliotecas
const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
//criando o app
const app = express();
//instanciando a biblioteca jsonwebtoken
const jwt = require("jsonwebtoken");
//criando uma chave secreta para o jwt
const secretKeyJwt = "ffhhae@#$¨%fdd!@#4";

//iniciado o cors no app
app.use(cors());    

//inicando o express com configuração básica
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//simulação do banco de dados
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
    ],
    users:[
        {
        id:1,
        email:"adm@teste.com.br",
        name:"admin",
        password:"12345"
    },
    {
        id:2,
        email:"claudisnei@teste.com",
        name:"Claudisnei",
        password:"teste123"
    }
]
}


//midleware para realizar a autenticação antes da rota ser executada
function auth(req, res, next){
    //pegando o header de autorização
    const authToken = req.headers['authorization']

    //validando o token
    if(authToken !=undefined){
        //cortando o token
        const bearer = authToken.split(' ');
        //pegando somente o token
        var token = bearer[1];

        //verificando se o token é valido
        jwt.verify(token,secretKeyJwt,(err, data)=>{
            if(err){
                res.status(401);
                res.json({err:"Token inválido!"});
            }else{

                //passando variáveis para a requisição
                //, estes dados poderão ser acessados
                //nas rotas que forem autenticadas
                req.token = token;
                req.logedUser = {id: data.id, email: data.email};
                //console.log(data);
                next();
            }
        });

        //console.log(bearer);
    }else{
        res.status(401);
        res.json({err:"Token inválido"});
    }

    //console.log(authToken);
    //se autenticação foi realizada com sucesso a função next que irá 
    //realizar a requisição do usuário
    
}


/**rota para autenticação */
app.post("/auth",(req,res)=>{
    var {email, password} = req.body;

    //validações
    if(email != undefined){
        //Verificando se o usuário é cadastrado
        var user = DB.users.find(us => us.email == email);

        if(user != undefined){
            
            if(user.password === password){
                /**deve-se passar as informações necessárias
                 * , a chave secreta e o prazo que irá expirar 
                 * o token
                 */
                
                jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                       
                    },
                    secretKeyJwt,{expiresIn:"48h"},(err, token)=>{
                        if(err){
                            res.status(400);
                            res.json({err: "Falha interna"});
                        }else{
                            res.status(200);
                            res.json({token: token});   
                        }
                    }) 

            }else{
                res.status(401).json( "Email ou senha inválidos");
               // res.json({err: "Email ou senha inválidos"});
            }

        }else{
            res.status(404);
            res.json({err: "Email ou senha inválidos"});
        }

    }else{
        res.status(400);
        res.json({err: "O email enviado é inválido."});
    }
});



/**primeira rota no primeiro end point que deverá listar todos
 * os games do sistema, incluindo o midleware de autenticação auth
 */
app.get('/games',auth,(req,res)=>{
    res.status(200);    
    res.json(DB.games);
});

/**rota para devolver ao usuário o game pelo ID */
app.get('/game/:id',auth,(req,res)=>{
   
    //tratando o id verificando se é numero 
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        
        var game = DB.games.find( game =>  game.id == id );
        
        if(game != undefined){
            res.status(200);
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }  
});

/**novo endpoint para cadastrar um novo game */
app.post('/game',auth,(req,res)=>{
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
app.delete('/game/:id',auth,(req,res)=>{
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
app.put('/game/:id',auth,(req,res)=>{
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



app.listen(4040,()=>{
    console.log("API rodando");
});


