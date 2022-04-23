const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const gamesController = require("./games/GamesController"); // USE GAME ROUTER
app.use("/",gamesController);

app.listen(3000, () => console.log(`Servidor rodadndo na porta: ${3000}!`))