import Game from './game';


document.addEventListener('DOMContentLoaded', () => {
    const backgroundCanvas = document.getElementById("background-canvas");
    const backgroundCanvasContext = backgroundCanvas.getContext("2d");

    const game = new Game(
        backgroundCanvasContext
    );

    game.draw();
})