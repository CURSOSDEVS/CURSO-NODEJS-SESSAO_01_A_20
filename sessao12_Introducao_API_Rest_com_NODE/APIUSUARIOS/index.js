//importando bibliotecs
const express = require("express");
const sequelize = require("sequelize");
const Game = require("./games/Game");

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
app.get('/',(req,res)=>{
    var games = JSON.stringify(Game.findAll({
        raw:true,
        order:[['title','ASC']]
    }).then(games =>{
        console.log('consegui carregar');
    }));

    res.send(games);
});

app.listen(4000,()=>{
    console.log("Servidor Rodando")
});