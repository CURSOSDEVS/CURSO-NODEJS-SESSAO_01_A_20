//importando bibliotecs
const express = require("express");
const sequelize = require("sequelize");
const User = require("./users/User");

//importando a conexão com o banco de dados
const connection = require('./database/database');
const { json } = require("sequelize");

//realizando a conexão com o banco de dados
connection.authenticate().then(()=>{
    console.log("Conexão OK.");
}).catch((err)=>{
    console.log('Erro ao conectar: '+ err);
});

//criando a aplicação
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


/** primeiro endpoint para carregar lista de usuário */
app.get('/users',(req,res)=>{
    var users = User.findAll().then(users =>{
        res.json(users);  
        res.statusCode = 200;
        console.log('consegui carregar');
    }).catch(err=>{
        res.sendStatus(404);
    });
});

/**Rota para buscar um usuario pelo id */
app.get('/user/:id',(req,res)=>{
    //capturando o id
    var id = req.params.id;
   
    //validando se é um número
    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        User.findOne( { where:{id:id} } ).then(user=>{
            if(user!=undefined){
                res.statusCode = 200;
                res.json(user);
            }else{
                res.sendStatus(404);
                console.log("Usuário não localizado");
            }
        }).catch(err => {
                console.log("Erro :"+ err);
        });
    }
    
});

/** rota para salvar um novo usuario */
app.post('/user',(req,res)=>{

    var {email, nome, nascimento, senha } = req.body;

    User.findOne({
        where:{email:email}
    }).then(user=>{
        if(user == undefined){
            User.create({
                email: email,
                nome: nome,
                nascimento: nascimento,
                senha: senha
            }).then(()=>{
                res.statusCode = 200;
                console.log("Usuário cadastrado");
            }).catch(err=>{
                res.sendStatus(400);
            })
        }else{
            res.sendStatus(401);
            console.log("Usuário já cadastrado");
        }
    })

    
});

/**rota para alterar um usuário */
app.put('/user/:id',(req,res)=>{
    //capturando os dados
    var {id, email, nome, nascimento, senha} = req.body;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        User.findOne({where:{id:id}}).then(user => {

            if(user!=undefined){
                res.statusCode = 200;
                User.update({
                    email:email,
                    nome:nome,
                    nascimento:nascimento,
                    senha:senha                
                    },{where:{id:id}}
                    ).then(user=>{ 
                        res.statusCode = 200;
                        console.log("Usuário editado com sucesso");
                    }).catch(err=>{
                        res.sendStatus(400);
                        console.log(err);
                    });
            }else{
                res.sendStatus(404);
            }
        }).catch(err=>{
            res.sendStatus(404);
            console.log(err)
        });

        
    }

});

/**rota para apagar um usuário */
 app.delete('/user/:id',(req,res)=>{
    var id = req.params.id;

       // id = parseInt(id);
    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        User.destroy({ where: {id:id} }).then(user=>{
            res.statusCode = 200;
            console.log("Usuário apagado com sucesso");
        }).catch(err=>{
            res.sendStatus(404);
            console.log(err);
        });
    }
 });

app.listen(4000,()=>{
    console.log("Servidor Rodando")
});