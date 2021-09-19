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
   // console.log("Aplicação rodando..");
    //res.send("Rodando...");
    res.render("index");
})

//rota post que receberá os dados do formulário e fará a validação
app.post('/form',(req,res)=>{
    
    //pega os dados passados no corpo da requisição e salva nas variáveis email, nome e ponto
    var {email, nome, pontos} = req.body;

    //cria as variaveis de erros que serão tratados
    var emailError, nomeError, pontosError;

    //validação do email caso ele não seja definido ou seja vazio
    if(email == undefined || email == ""){
        emailError = "O email não pode ser vazio";
    }

    //validação do campo pontos 
    if(pontos == undefined || pontos < 20){
        pontosError = "A pontuação não pode ser menor de 20";
    }

    //validação do campo nome
    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio";
    }

    //verifica se ocorreu qualquer erro de validação
    if(emailError!=undefined || pontosError!=undefined || nomeError!=undefined){
        res.send("Esse form está com erro");
    }else{
        res.send("Show de bola este Form");
    }

    

});

//rodando o servidor
app.listen(4030, (req,res)=>{
    console.log("Servidor rodando");
});