class Display {
    constructor() {
        this.titleText = "dino FOREST";
        this.startInfoText = "Press ENTER to START";

        this.gameOverText = "GAME OVER";
        this.restartInfoText = "Press ENTER to RETRY";

        this.isGameOver = false;
    }

    draw(ctx) {
        // start
        if (!this.isGameOver) {
            ctx.font = '20px Arial';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.strokeText(this.titleText, 486, 440);
            ctx.fillText(this.titleText, 486, 440);
            ctx.strokeText(this.startInfoText, 486, 600);
            ctx.fillText(this.startInfoText, 486, 600);
        }
        // game over
        else {
            ctx.font = '20px Arial';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.strokeText(this.gameOverText, 486, 500);
            ctx.fillText(this.gameOverText, 486, 500);
            ctx.strokeText(this.restartInfoText, 486, 600);
            ctx.fillText(this.restartInfoText, 486, 600);
        }
    }
}

export default Display;