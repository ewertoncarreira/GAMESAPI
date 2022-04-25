const express = require("express");
const router = express.Router();
const Game = require("./Game");
const {middlewareJWT} = require("../middlewares/middlewareJWT");

function generateGameHATEOAS(gameId){
    let HATEOAS = [
        {
            link: "/games",
            method: "GET",
            rel: "gel_all_games"
        },
        {
            link: "/game/"+gameId,
            method: "GET",
            rel: "get_game"
        },
        {
            link: "/game/"+gameId,
            method: "DELETE",
            rel: "delete_game"
        },
        {
            link: "/game/"+gameId,
            method: "PUT",
            rel: "edit_game"
        }
    ];
    return HATEOAS
}

router.get('/games', middlewareJWT, (req, res) => {
    Game.findAll({
        order: [
            ["id","asc"]
        ]}
    ).then((games) => {

        // INPUTS DYNAMIC HATEOAS
        let returnGames = [];
        games.forEach((game,index) =>{
            game.dataValues._links = generateGameHATEOAS(game.id);
            games[index] = (game);
        });

        res.statusCode = 200;
        res.json(games);
    }).catch((err) => {
        res.statusCode = 500;
        res.json({err : err.message});
    });
});

router.get('/game/:gameId', middlewareJWT, (req, res) => {
    let {gameId} = req.params;
    if (gameId != undefined && !isNaN(gameId)) {
        Game.findByPk(parseInt(gameId)).then((game) => {
            if (game === null || game == undefined) {
                res.statusCode = 404;
                res.json({err: "game not found"});
            }else{
                // ADDING HATEOAS LINKS
                game.dataValues._links = generateGameHATEOAS(gameId);
                res.statusCode = 200;
                res.json(game);
            }
        }).catch((err) => {
            console.log(err.stack);
            res.statusCode = 500;
            res.json({err : err.message});
        });
    }else{
        res.statusCode = 400;
        res.json({err : "parameter id is required"});
    }
});

router.post('/game', middlewareJWT, (req, res) => {
    let { title, year, price } = req.body;
    Game.create({
        title,
        year,
        price
    }).then((game) => {
        res.statusCode = 200;
        // ADDING HATEOAS LINKS
        game.dataValues._links = generateGameHATEOAS(game.id);
        res.json(game);
    }).catch((err) => {
        if (err.stack.toLowerCase().includes("sequelizevalidationerror")) {
            res.statusCode = 400;
            res.json({err: err.message});
        }else{
            res.statusCode = 500;
            res.json({err : err.message});
        }
    });
});

router.delete('/game/:gameId', middlewareJWT, async (req, res) => {
    let {gameId} = req.params;
    if (gameId != undefined && !isNaN(gameId)) {
        try {
            let game = await Game.findByPk(parseInt(gameId));
            if (game != undefined){
                Game.destroy(
                    {where: {id: gameId}}
                ).then((count) => {
                    res.statusCode = 200;
                    res.json({ deleteCount: count, _links: generateGameHATEOAS(0)});
                }).catch((err) => {
                    res.statusCode = 500;
                    res.json({err: err.message});
                });
            }else{
                res.statusCode = 404;
                res.json({err: "game not found"});
            }
        } catch (err) {
            res.statusCode = 500;
            res.json({err: err.message});
        }
    }else{
        res.statusCode = 400;
        res.json({err : "parameter id is required"});
    }
});

router.put('/game/:gameId', middlewareJWT, async (req, res) => {
    let {gameId} = req.params;
    let {title, year, price} = req.body;

    // Remove Undefined fields
    let updateFields = {title: title, year: year, price: price};
    Object.keys(updateFields).forEach((key) => {
        if (updateFields[key] == undefined){
           delete updateFields[key];
        }
    });

    if (gameId != undefined && !isNaN(gameId)) {
        let game = await Game.findByPk(parseInt(gameId));
        if (game != undefined){
            Game.update(
                updateFields
                ,{where: {id: gameId}}
            ).then((gameUpdated) => {
                res.statusCode = 200;
                res.json({ updateCount: gameUpdated[0], _links: generateGameHATEOAS(game.id)}) ;
            }).catch((err) => {
                if (err.stack.toLowerCase().includes("sequelizevalidationerror")) {
                    res.statusCode = 400;
                    res.json({err: err.message});
                }else{
                    res.statusCode = 500;
                    res.json({err: err.message});
                }
            });
        }else{
            res.statusCode = 404;
            res.json({err: "game not found"});
        }
    }else{
        res.statusCode = 400;
        res.json({err : "parameter id is required"});
    }
});

module.exports = router;