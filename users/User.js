const {connection, Sequelize} = require("../database/database");

const User = connection.define('users',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Please enter the name of the login"},
        }
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Please enter the name of the login"},
            isEmail: {msg: "Please enter a valid email"}
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Please enter the password of the login"},
        }
    },
});

// FORCE DATABASE TABLE SYNC
// User.sync({force:true});

module.exports = User;