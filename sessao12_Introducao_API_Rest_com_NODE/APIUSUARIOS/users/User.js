//importando bibliotecas
const Sequelize = require("sequelize");
const connection = require('../database/database');

const User  = connection.define('users',{
    email:{
        type:Sequelize.STRING,
        allowNull:false},
    nome:{
        type:Sequelize.STRING,
        allowNull:false},
    nascimento:{
        type:Sequelize.DATE,
        allowNull:false} ,
    senha:{
        type:Sequelize.STRING,
        allowNull:true
    }  
});

//User.sync({force:true});

module.exports = User;