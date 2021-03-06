//importando o express
const express = require('express');

//utilizando o router para carregar as rotas
const router = express.Router();

/**Banco de dados */
//importando o model de user
const User = require('./User');

//importando o bcrypt para o controller para utilizar
//hash na senha do usuário
const bcrypt = require('bcryptjs');


//rota para abrir a página com a lista de usuário
router.get('/admin/users',(req,res)=>{
    //verifica se o usuário está logado através da sessão
    //user
   // if(req.session.user == undefined){
   //     res.redirect('/');
  //  }

    //consultandos os registros da tabela de usuários
    User.findAll({
        raw:true,
        order:[['id','DESC']]
    }).then(users=>{
        if(users != undefined){
            res.render('../views/admin/users/index',{users:users});
        }else{
            res.redirect('../views/admin/users/create');
        }
    });
    
});

//rota para carregar a página com o formulário de cadastro dos usuário
router.get('/admin/users/create',(req,res)=>{
    res.render('../views/admin/users/create');
});

//rota para salvar no banco de dados o usuário
router.post('/users/save',(req, res)=>{

    var mail = req.body.email;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    //utilizado para teste antes de popular no banco de dados
    //res.json({mail, hash});

    //verifica se o ja existe o email cadastrado 
    User.findOne({where: {mail: mail}}).then(user=>{
        if(user == undefined){
            User.create({
                mail: mail,
                password: hash
            }).then(()=>{
                res.redirect('/');
            }).catch(err =>{
                res.send("Erro desconhecido. "+ err);
            });
        }else{
            res.redirect('/admin/users/create');
        }
    });
    
    
    
});

//rota para excluir um usuário
router.post('/user/delete',(req, res)=>{
    var userId = req.body.userId;
    User.destroy({
        where:{ id: userId }
    }).then(()=>{
        res.redirect('/admin/users');
    }).catch(err=>{
        res.send("Erro desconhecido. "+ err);
    });
});

//rota para carregar o formulário de login do usuário
router.get('/admin/users/login',(req,res)=>{
    res.render('../views/admin/users/login');
});

//rota para fazer o login
router.post('/authenticate',(req, res)=>{
    //recebendo os dados do formulário
    var email = req.body.email;
    var password = req.body.password;

    //pesquisar se existe o usuário no banco de dados
    User.findOne({where:{mail: email}}).then(user=>{
        if(user!= undefined){
            //validar a senha o decript compara se a senha
            //informada pelo usuario é igual a salva no banco de dados
            var correct = bcrypt.compareSync(password,user.password);
            
            //verifica se a senha é a correta
            if(correct){
                //criando uma sessão user
                req.session.user = {
                    id: user.id,
                    email: user.mail
                }
                //testando 
                //res.json(req.session.user);
                res.redirect('/admin/articles');
            }else{
                res.redirect('/admin/users/login')
            }

        }else{
            res.redirect('/admin/users/login')
        }
    }).catch(err =>{
        res.send("Erro "+ err);
    })
});

//rota para fazer o logout
router.get('/logout',(req,res)=>{
    //tornando a sessão user indefinida ou vazia
    req.session.user = undefined;
    //redirecionando para a home page
    res.redirect('/');
});

//exportando o router
module.exports = router;