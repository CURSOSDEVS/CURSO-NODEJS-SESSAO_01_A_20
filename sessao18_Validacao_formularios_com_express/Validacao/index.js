//importando as bibliotecas
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");


//instancia do express
const app = express();

//configurando a viw engine
app.set('view engine','ejs');

//configuração do express
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//configurando o express-session
app.use(session({
    secret: "Keyboard Cat",
    resave: false,
    saveUninitialized:true,
    cookie:{secure:true}
}))

//configuração do express-flash
app.use(flash());

//teste para verificar se a aplicação está rodando
app.get('/',(req,res)=>{
    console.log("Aplicação rodando..");
    res.send("Rodando...");
})

//rodando o servidor
app.listen(4030, (req,res)=>{
    console.log("Servidor rodando");
});