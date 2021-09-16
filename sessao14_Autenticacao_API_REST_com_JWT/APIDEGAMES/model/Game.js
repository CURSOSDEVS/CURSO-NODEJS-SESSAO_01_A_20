const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("./User");

const Game = connection.define('games',{
    title: {
        type:Sequelize.STRING,
        allowNull: false},
    year:{
        type:Sequelize.NUMBER,
        allowNull:false},
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false}
});

Game.sync({force:true});

module.exports = Game;