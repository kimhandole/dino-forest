import Game from './game';

const WIDTH = 928;
const HEIGHT = 793;


document.addEventListener('DOMContentLoaded', () => {
    // game 
    const gameCanvas = document.getElementById("game-canvas");
    gameCanvas.width = WIDTH;
    gameCanvas.height = HEIGHT;
    const gameContext = gameCanvas.getContext("2d");

    // background layer 1
    const background1Canvas = document.getElementById("background1-canvas");
    background1Canvas.width = WIDTH;
    background1Canvas.height = HEIGHT;
    const background1Context = background1Canvas.getContext("2d");

    // background layer 2
    const background2Canvas = document.getElementById("background2-canvas");
    background2Canvas.width = WIDTH;
    background2Canvas.height = HEIGHT;
    const background2Context = background2Canvas.getContext("2d");

    // background layer 3
    const background3Canvas = document.getElementById("background3-canvas");
    background3Canvas.width = WIDTH;
    background3Canvas.height = HEIGHT;
    const background3Context = background3Canvas.getContext("2d");

    // background layer 4
    const background4Canvas = document.getElementById("background4-canvas");
    background4Canvas.width = WIDTH;
    background4Canvas.height = HEIGHT;
    const background4Context = background4Canvas.getContext("2d");

    // background layer 5
    const background5Canvas = document.getElementById("background5-canvas");
    background5Canvas.width = WIDTH;
    background5Canvas.height = HEIGHT;
    const background5Context = background5Canvas.getContext("2d");

    // background layer 6
    const background6Canvas = document.getElementById("background6-canvas");
    background6Canvas.width = WIDTH;
    background6Canvas.height = HEIGHT;
    const background6Context = background6Canvas.getContext("2d");

    // background layer 7
    const background7Canvas = document.getElementById("background7-canvas");
    background7Canvas.width = WIDTH;
    background7Canvas.height = HEIGHT;
    const background7Context = background7Canvas.getContext("2d");

    // background layer 8
    const background8Canvas = document.getElementById("background8-canvas");
    background8Canvas.width = WIDTH;
    background8Canvas.height = HEIGHT;
    const background8Context = background8Canvas.getContext("2d");

    // background layer 9
    const background9Canvas = document.getElementById("background9-canvas");
    background9Canvas.width = WIDTH;
    background9Canvas.height = HEIGHT;
    const background9Context = background9Canvas.getContext("2d");

    // background layer 10
    const background10Canvas = document.getElementById("background10-canvas");
    background10Canvas.width = WIDTH;
    background10Canvas.height = HEIGHT;
    const background10Context = background10Canvas.getContext("2d");

    const game = new Game(
        gameCanvas,
        gameContext,
        background1Context,
        background2Context,
        background3Context,
        background4Context,
        background5Context,
        background6Context,
        background7Context,
        background8Context,
        background9Context,
        background10Context
    );

    game.draw()
})