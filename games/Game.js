const {connection, Sequelize} = require("../database/database");

const Game = connection.define('games',{
    title:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Please enter the title of your game"},
        }
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: {msg: "Yaer only accepts integers"}
        }
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isFloat: {msg: "Price only accepts floats"}
        }
    },
});

// FORCE DATABASE TABLE SYNC
// Game.sync({force:true});

module.exports = Game;