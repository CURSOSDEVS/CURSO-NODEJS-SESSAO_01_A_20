//importando bibliotecas
const Sequelize = require("sequelize");
const connection = require('../database/database');

const Game  = connection.define('games',{
    title:{
        type:Sequelize.STRING,
        allowNull:false},
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false},
    year:{
        type:Sequelize.DATE,
        allowNull:false}   
});

//Game.sync({force:true});

module.exports = Game;