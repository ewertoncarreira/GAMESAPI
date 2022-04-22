const express = require("express");
const router = express.Router();
const Game = require("./Game");

router.get('/games', (req, res) => {
    Game.findAll({
        order: [
            ["id","asc"]
        ]}
    ).then((games) => {
        res.statusCode = 200;
        res.json(games);
    }).catch((err) => {
        res.statusCode = 500;
        res.json({err : err.message});
    });
});

router.get('/game/:gameId', (req, res) => {
    let {gameId} = req.params;
    if (gameId != undefined && !isNaN(gameId)) {
        Game.findByPk(parseInt(gameId)).then((game) => {
            if (game === null || game == undefined) {
                res.sendStatus(404);
            }else{
                res.statusCode = 200;
                res.json(game);
            }
        }).catch((err) => {
            console.log(err.stack);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(400);
    }
});

router.post('/game', (req, res) => {
    let { title, year, price } = req.body;
    Game.create({
        title,
        year,
        price
    }).then((game) => {
        res.statusCode = 200;
        res.json(game);
    }).catch((err) => {
        if (err.stack.toLowerCase().includes("sequelizevalidationerror")) {
            res.statusCode = 400;
            res.json({err: err.message});
        }else{
            res.sendStatus(500);
        }
    });
});

router.delete('/game/:gameId', async (req, res) => {
    let {gameId} = req.params;
    if (gameId != undefined && !isNaN(gameId)) {
        try {
            let game = await Game.findByPk(parseInt(gameId));
            if (game != undefined){
                Game.destroy(
                    {where: {id: gameId}}
                ).then((count) => {
                    res.statusCode = 200;
                    res.json({ deleteCount: count}) ;
                }).catch((err) => {
                    console.log(err.stack);
                    res.sendStatus(500);     
                });
            }else{
                res.sendStatus(404);
            }
        } catch (err) {
            console.log(err.stack);
            res.sendStatus(500);
        }
    }else{
        res.sendStatus(400);
    }
});

router.put('/game/:gameId', async (req, res) => {
    let {gameId} = req.params;
    let {title, year, price} = req.body;
    console.log(title, year, price);
    if (gameId != undefined && !isNaN(gameId)) {
        let game = await Game.findByPk(parseInt(gameId));
        if (game != undefined){
            Game.update(
                {
                    title: title,
                    year: year,
                    price: price,
                }
                ,{where: {id: gameId}}
            ).then((gameUpdated) => {
                console.log('AAAAA');
                res.statusCode = 200;
                res.json(gameUpdated) ;
            }).catch((err) => {
                if (err.stack.toLowerCase().includes("sequelizevalidationerror")) {
                    res.statusCode = 400;
                    res.json({err: err.message});
                }else{
                    res.sendStatus(500);
                }
            });
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(400);
    }
});

module.exports = router;