function adminAuth(req, res, next){
    //o parâmetro next serve para dar continuidade na requisição
    //se a sessão user existe, significa que o usuário está logado
    //então vai para next() ou seja vai para o próximo caminho
    if(req.session.user != undefined){
        next();
    }else{
        //se a sessão não existir será dado um redirect para home page
        res.redirect('/admin/users/login');
    }
}

module.exports = adminAuth;