//importando o express
const express = require('express');
const slugify  = require('slugify');

//utilizando o router para carregar as rotas
const router = express.Router();
//importando o model categoria que será utilizado para acesso ao banco de dados
const Category = require('./Category');

//********************************
//utilizando o express.urlencoded para trabalhar com formulários
router.use(express.urlencoded({extended:false}));
//configuracao para utilizar os dados do formulário em json
router.use(express.json());

//criando a rota para acessar a página new e criar nova categoria
router.get('/admin/categories/new',(req,res)=>{
    //sempre que o arquivo estiver fora da pasta view deve-se
    //informar todo o endereço do arquivo que será aberto
    res.render('admin/categories/new');
});

//criando a rota para receber os dados do formulário e salvar na tabela categories
router.post('/categories/save',(req, res)=>{
    //pegar os dados do formulário criando uma variável que
    //irá armazenar o valor do campo input 'title'
    var title = req.body.title;
    //verificar se o título existe 
    if(title != undefined){
        Category.create({
            title: title,
            //slug é a versão otimizada para url utilizando a biblioteca
            // do node chamada slugify
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories');
        });
    }else{
        //redirecionando o usuário para a página news pois ele não
        //o campo de title está vazio
        res.redirect('/admin/categories/new');
    }
});

//criando rota para pegar todos os dados da tabela categories e
//mostrá-los na página index.ejs da pasta categorias
router.get('/admin/categories',(req,res)=>{
    //busca todos os registros sem filtro 'where'
    Category.findAll({
        raw: true, 
        order:[['id','ASC']]
    }).then(categories =>{
        res.render('admin/categories/index',{categories: categories})
    });
});

//rota para realizar a exclusão de uma categoria
router.post('/categories/delete',(req, res)=>{
    var id = req.body.id;
    if((id != undefined) || (!isNaN(id))){
        //deletando a categoria
        Category.destroy({
            where: {
                id: id
            }
        }).then(()=>{
            res.redirect('/admin/categories');
        });
    }else{
        res.redirect('/admin/categories');
    }
});

//rota para abrir a página de edição da categoria
router.get('/admin/categories/edit/:id',(req, res)=>{
    var id = req.params.id;
    //verificando se o id é valido, se é um número
    if(isNaN(id)){
        res.redirect('/admin/categories');
    }
    //será realizado uma pesquisa pelo PK
    //Category.findByPK(id).then(categoria=>{
      Category.findOne({where: {id: id}}).then(category =>{
        if(category != undefined){
            res.render('admin/categories/edit',{category: category});
        }else{
            res.redirect('/admin/categories');
        };
    }).catch(erro=>{
        res.redirect('/admin/categories');
    });
});

//rota para salvar a alteração da categoria
router.post('/categories/update',(req, res)=>{
    //var id = req.params.id;
    var title = req.body.title;
    var id = req.body.id;
    var slug = slugify(title);

    //alterando o valor do campo
    Category.update({
        title: title, 
        slug: slug 
    },{where:{
            id:id
        }
    }).then(()=>{
        res.redirect('/admin/categories');
    });     
});


//exportando o router
module.exports = router;