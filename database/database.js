const Sequelize = require("sequelize");
const connection = new Sequelize('gamesapi','root','spypreto',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = {connection , Sequelize};