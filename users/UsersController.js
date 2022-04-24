const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const {jwt, JWTSecret, middlewareJWT} = require("../middlewares/middlewareJWT");

router.post("/auth",  (req, res) => {
    let {email, password} = req.body;

    if (email === undefined || password === undefined) {
        res.statusCode = 400;
        res.json({err: "email/password are required"});
    }else{
        User.findOne(
        {where: {
            email: email,
            }
        }).then((user) => {
            if (user != undefined) {
                let validPassword = bcrypt.compareSync(password,user.password)
                if (validPassword){

                    let token = jwt.sign({id: user.id,email: user.email},JWTSecret,{expiresIn:"48h"});

                    res.statusCode = 200;
                    res.json({token: token});
                }else{
                    res.statusCode = 401
                    res.json({err: "invalid password"});
                }
            }else{

                res.statusCode = 404;
                res.json({err: "user not found"});
            }
        }).catch((err) => {
            res.statusCode = 500;
            res.json({err: err.message});
        })
    }
})

router.post('/user', middlewareJWT, (req, res) => {
    let { name, email, password } = req.body;

    if (password != undefined){
        password = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    };

    User.create({
        name,
        email,
        password
    }).then((user) => {
        res.statusCode = 200;
        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }).catch((err) => {
        if (err.stack.toLowerCase().includes("sequelizevalidationerror")) {
            res.statusCode = 400;
        }else{
            res.statusCode = 500;
        };
        res.json({err: err.message});
    });
});

router.get('/users', middlewareJWT, (req, res) => {
    User.findAll().then((users) =>{
        if (users!=undefined){
            res.statusCode = 200;
            res.json(users);
        }else{
            res.statusCode = 404;
            res.json({err: 'user not found'});
        }
    }).catch((err)=>{
        res.statusCode = 500;
        res.json({err : err.message});
    });
});


module.exports = router;