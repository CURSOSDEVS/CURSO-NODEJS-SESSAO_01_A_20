//importando o express
const express = require('express');
const { default: slugify } = require('slugify');
//utilizando o router para carregar as rotas
const router = express.Router();
//importanto o slugify
const slug = require('slugify');

/**Banco de dados */
//importando o model de categorias e artigos
const Category = require('./../categories/Category');
const Article = require('./Article');

//rota para abrir a página com a lista de artigos
router.get('/admin/articles',(req,res)=>{
    //consultandos os registros da tabela de artigos
    Article.findAll(
      //  {raw:true, order:[['id','DESC']]},
        {order:[['id','DESC']], include:[{model: Category}]}).then(articles=>{
            res.render("admin/articles/index",{articles:articles});
        })
});

//criando a rota para abrir a página de cadastro de artigos e enviar as categorias que serão
//usadas no listbox
router.get('/admin/articles/new',(req,res)=>{
    Category.findAll({
        raw:true, 
        order:[['id','DESC']]}).then(categories=>{
            res.render('admin/articles/new',{categories:categories});
        });
});

//criando a rota para salvar no banco de dados a novo artigo
router.post('/articles/save',(req,res)=>{
    var categoryId = req.body.category;
    var body = req.body.article;
    var title = req.body.title;
    var slug = slugify(title);

    //salvando o artigo
    Article.create({
        title: title,
        body: body,
        slug: slug,
        categoryId:categoryId
    }).then(()=>{
        res.redirect('/admin/articles');
    });

});

//criando rota para apagar um artigo no banco de dados
router.post('/article/delete',(req,res)=>{
    var id = req.body.id;
    //validando o id
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{id:id}
            }).then(()=>{
                res.redirect('/admin/articles');
            });
        }else{
            res.redirect('/admin/articles');
        }

    }else{
        res.redirect('/admin/articles');
    }
});

//rota para abrir a página edit.ejs de articles e
//carregar os valores do artigo selecionado nos campos
//do formulário
router.get('/admin/articles/edit/:id',(req, res)=>{
    var id = req.params.id;
    Article.findOne({
        where: {id:id},
        //incluimos a categoria junto com o artigo encontrado
        //na página edit utilizaremos o title da categoria
        include:[{model:Category}]
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render('../views/admin/articles/edit.ejs',{article:article, categories:categories});
            });
        }else{
            res.redirect('/admin/articles');
        }
    }).catch(err =>{
        res.redirect('/admin/articles');
    });
});

//rota para salvar as alterações realizadas no artigo
router.post('/articles/update',(req,res)=>{
    //variaveis da página de edição 
    var id = req.body.articleId;
    var title = req.body.title;
    var body = req.body.article;
    var categoryId = req.body.category;
    var slug = slugify(title);

    Article.update({
        title:title,
        body:body,
        categoryId:categoryId,
        slug:slug
        },
        {where: {id:id}
    }).then(()=>{
        alert("Registro atualizado com sucesso!");
        res.redirect('/admin/articles');
    }).catch(err => {
        res.redirect('/admin/articles');
    });
});

//logica para a paginaca
router.get('/articles/page/:num',(req, res)=>{
    /*logica da paginacao
      offset =  pag *
      limit = 4    
       1  =  0 - 3
       2  =  4 - 7
       3  =  8 - 11
        */
    var page = req.params.num;
    var limit = 4;
    var offset = 0;
    //verificar se a página é valida se não for o offset é 0
    if((isNaN(page)) || (page === 1)){
        offset = 0;
    }else{
        offset = parseInt(page) * limit;
    }
    //retornando todos os elementos e a quantidade de elementos da tabela
    Article.findAndCountAll({
         //paramento limit será o limite de elementos por página
         limit: limit,
         //parametro offset retorna dados apártir de uma posição
         offset: offset
    }).then(articles=>{
        //retorna os artigos no formato JSON
        res.json(articles);
    });

});


//exportando o router
module.exports = router;