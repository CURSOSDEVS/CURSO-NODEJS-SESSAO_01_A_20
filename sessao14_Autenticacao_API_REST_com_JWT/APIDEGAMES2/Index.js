//importando as bibliotecas
const express = require("express");
const cors = require("cors");
const sequelize = require("sequelize");

//importando a connection
const connection = require('./database/database');

//realizando autenticação no banco de dados
connection.authenticate().then(()=>{
    console.log("Conexão OK");
}).catch(err=>{
    console.log('Erro: '+err);
});

//importando os models
const User = require('./model/User');
const Game = require('./model/Game');

//criando o app
const app = express();

//instanciando a biblioteca jsonwebtoken para autenticação
const jwt = require("jsonwebtoken");

//criando uma chave secreta para o jwt para realizar a autenticação
const secretKeyJwt = "ffhhae@#$¨%fdd!@#4";

//iniciado o cors no app
app.use(cors());    

//inicando o express com configuração básica
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//midleware para realizar a autenticação antes da rota ser executada
function auth(req, res, next){

    //pegando o header de autorização
    const authToken = req.headers['authorization']

    //validando o token
    if(authToken != undefined){

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

                //se autenticação foi realizada com sucesso a função next que irá 
                //realizar a requisição do usuário
                next();
            }
        });

       // console.log(bearer);
    }else{
        res.status(401);
        res.json({err:"Token inválido"});
    }

    //console.log(authToken);
    
    
}

/**primeira rota no primeiro end point que deverá listar todos
 * os games do sistema, incluindo o midleware de autenticação auth
 */

app.get('/games',auth,(req,res)=>{
    var {name,email,password} = req.body;
    //consulta os games no banco de dados
    Game.findAll().then((games)=>{
        if(games !=undefined){            
            res.status(200);
           // res.sendStatus(200);
            res.json({user: req.logedUser, games: games});
            console.log("Jogos carregados com sucesso.");
           }
    }).catch(err=>{
        res.status(404);
       // res.sendStatus(404);
        res.json({erro: "Erro :", err:err});
        console.log('Erro: '+ err);      
    });
   // res.statusCode = 200;
   
   
});

/**rota para devolver ao usuário o game pelo ID */
app.get('/game/:id',auth,(req,res)=>{
   
    //tratando o id verificando se é numero 
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        
        //var game = DB.games.find( game =>  game.id == id );
        Game.findOne({
            where:{id:id}
        }).then((game)=>{
            if(game != undefined){
                res.status(200);
                res.json(game);
            }else{
                res.sendStatus(404);
            }
        }).catch(err=>{
            console.log("Erro: "+err);
        }); 
    }
});

/**novo endpoint para cadastrar um novo game */
app.post('/game',auth,(req,res)=>{
    
    //utilizando a destruct para facilitar a manipulação de dados
    var {title, year, price} = req.body;

    //o ideal é validar todos os dados conforme as regras no negocio 
    //e retornar o status code 400 caso não se enquadre nas regras
    
    //adicinando dados no banco de dados
    Game.create({
        title: title,
        year: year,
        price: price
    }).then(()=>{
        res.status(200);        
        console.log("Jogo criado com sucesso.");
        res.sendStatus(200);
    }).catch(err=>{
        res.sendStatus(401);
        console.log("Erro: "+err);
    });

});

/**novo endpoint para deletar um jogo */
app.delete('/game/:id',auth,(req,res)=>{
    /**validação */
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{        
        var id = parseInt(req.params.id);

       var game = Game.findOne({where:{id:id}});

       if(game != undefined){
            Game.destroy({
                where:{id:id}
            }).then(()=>{
                res.status(200);
                console.log("Game apagado");
                res.json({g:"Game apagado com sucesso!"});
            }).catch();
       }else{
           res.sendStatus(404);
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
        //var game = DB.games.find( g=> g.id == id);
        var game = Game.findOne({where:{id:id}})
        
        if(game != undefined){
            //peqando os dados que estão na requisição
            var {title, price, year} = req.body;
            
            if(title == undefined){
                title = game.title;
            }
            if(year == undefined){
                year = game.year;
            }
            if(price = undefined){
                price = game.price;
            }

            Game.update({
                title: title,
                year: year,
                price: price
            },{where:{id:id}}).then(()=>{
                res.status(200);
                res.sendStatus(200);
            }).catch(err=>{
                res.status(401);
                res.sendStatus(401);
            });
        }
    }
});



/**rota para autenticação */
app.post("/auth",(req,res)=>{
    var {id, email, password} = req.body;

    //validações
    if(email != undefined){
        User.findOne({where:{email:email}}).then((user)=>{
            if(user != undefined){
                if(user.password === password){
                    /**deve-se passar as informações necessárias
                     * , a chave secreta e o prazo que irá expirar 
                     * o token
                     */                    
                    jwt.sign(
                        {
                            id: user.id,
                            email: user.email
                        },
                        secretKeyJwt,
                        {expiresIn:'48h'},(err, token)=>{
                            if(err){
                                res.status(400);
                                res.json({err: "Falha interna"});
                            }else{
                                res.status(200);
                                res.json({token: token});
                            }
                        }) 
    
                }else{
                    res.status(401);
                    res.json({err: "Email ou senha inválidos1", p: user.password , p2: password});
                }
    
            }else{
                res.status(404);
                res.json({err: "Email ou senha inválidos2"});
            }
        }).catch(err=>{
            res.status(401);
            res.json({err:"Erro :"+err});
        });

    }else{
        res.status(400);
        res.json({err: "O email enviado é inválido."});
    }
});


app.listen(4040,()=>{
    console.log("API rodando");
});


