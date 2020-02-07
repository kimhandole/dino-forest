class Display {
    constructor() {
        this.titleText = "DINO FOREST";
        this.startInfoText = "Press ENTER to START";
        this.gameOverText = "GAME OVER";
        this.restartInfoText = "Press ENTER to RETRY";
        this.gameInfoText = "Press SPACE BAR to JUMP";

        this.isGameOver = false;
    }

    info(ctx) {
        ctx.font = '32px Amatic SC'
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.strokeText(this.gameInfoText, 495, 556);
        ctx.fillText(this.gameInfoText, 495, 556);
    }

    draw(ctx) {
        // start
        if (!this.isGameOver) {
            ctx.font = '32px Amatic SC';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.strokeText(this.titleText, 495, 410);
            ctx.fillText(this.titleText, 495, 410);
            ctx.strokeText(this.startInfoText, 495, 556);
            ctx.fillText(this.startInfoText, 495, 556);
        }
        // game over
        else {
            ctx.font = '32px Amatic SC';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.strokeText(this.gameOverText, 495, 410);
            ctx.fillText(this.gameOverText, 495, 410);
            ctx.strokeText(this.restartInfoText, 495, 556);
            ctx.fillText(this.restartInfoText, 495, 556);
        }
    }
}

export default Display;