import Background from './background';

class Game {
    constructor(backgroundContext) {
        this.createBackground(backgroundContext);
    }

    createBackground(backgroundContext) {
        const backgroundImage = new Image();
        backgroundImage.src = "../assets/images/background/background-layer0.png";
        this.background = new Background(backgroundContext, backgroundImage, 0, 900, 0.8);
    }

    draw() {
        this.background.draw();
    }
}

export default Game;