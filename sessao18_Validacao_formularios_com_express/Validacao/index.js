//importando as bibliotecas
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");



//instancia do express
const app = express();

//configurando a viw engine
app.set('view engine','ejs');

//configuração do express
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//ativando o cookie parser
app.use(cookieParser("palavra secreta"));

//configurando o express-session
app.use(session({
    secret: "Keyboard Cat",
    resave: false,
    saveUninitialized:true,
    cookie:{ maxAge:60000 }
})) 

//configuração do express-flash
app.use(flash());

//rota principal da aplicação
app.get('/',(req,res)=>{
   
    //cria as variaveis de erros que receberão os valores das sessions-flash criadas na rota post
    var emailError = req.flash("emailError");
    var nomeError = req.flash("nomeError");
    var pontosError = req.flash("pontosError");

    //console.log(emailError);

    //verifica se o erro existe, caso não exista será setado undefined na variável
    emailError = (emailError == undefined || emailError == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError == 0 )? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError == 0)? undefined : pontosError;

    //criando variaveis para receber o conteúdo dos campos e retornalos
    //para o formulário
    var email = req.flash("conteudoEmail");
    var nome = req.flash('conteudoNome');
    var pontos = req.flash('conteudoPontos');  

    //verifica se existe valores passados senão seta
    email = (email == undefined || email == 0)? undefined: email;
    nome = (nome == undefined || nome == 0)? undefined: nome;
    pontos = (pontos == undefined || pontos < 0)? undefined: pontos;

    res.render("index",{emailError, pontosError, nomeError, email: email, nome: nome, pontos: pontos});
});

//rota post que receberá os dados do formulário e fará a validação
app.post('/form',(req,res)=>{
    
    //pega os dados passados no corpo da requisição e salva nas variáveis email, nome e ponto
    var {email, nome, pontos} = req.body;

    //cria as variaveis de erros que serão tratados
    var emailError;
    var nomeError;
    var pontosError;

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

    //verifica se o erro existe, caso não exista será setado undefined na variável
    emailError = (emailError == undefined || emailError == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError == 0 )? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError == 0)? undefined : pontosError;

    //verifica se ocorreu qualquer erro de validação
    if(emailError!=undefined || pontosError!=undefined || nomeError!=undefined){
        //console.log(emailError+pontosError+nomeError);
        //criando sessions-flash para enviar o erro para outra rota
        req.flash('emailError', emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError",nomeError);

        //criando flash-sessions para retornar o conteúdo dos campos para o formuláro 
        //novamente e não deixar o campo em brando
        req.flash('conteudoEmail', email);
        req.flash('conteudoNome',nome);
        req.flash('conteudoPontos',pontos);

        res.redirect('/');
    }else{
        res.send("Show de bola este Form");
    }

});

//rodando o servidor
app.listen(4030, (req,res)=>{
    console.log("Servidor rodando");
});