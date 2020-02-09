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

    setHighScore(score) {
        this.saveScoreText = `⭐️ Submit Your High Score ⭐️`;
        this.scoreText = `${score}`;
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
            ctx.strokeText(this.saveScoreText, 485, 160);
            ctx.fillText(this.saveScoreText, 485, 160);
            ctx.strokeText(this.scoreText, 485, 200);
            ctx.fillText(this.scoreText, 485, 200);
            ctx.strokeText(this.gameOverText, 485, 410);
            ctx.fillText(this.gameOverText, 485, 410);
            ctx.strokeText(this.restartInfoText, 485, 556);
            ctx.fillText(this.restartInfoText, 485, 556);
        }
    }
}

export default Display;