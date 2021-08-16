//importando o express
const express = require('express');

//utilizando o router para carregar as rotas
const router = express.Router();

/**Banco de dados */
//importando o model de user
const User = require('./User');

//rota para abrir a página com a lista de usuário
router.get('/admin/users',(req,res)=>{
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

    User.create({
        mail: mail,
        password: password
    }).then(()=>{
        res.redirect('/admin/users');
    }).catch(err =>{
        res.send("Erro desconhecido. "+ err);
    });

});

//rota para excluir um usuário




//exportando o router
module.exports = router;