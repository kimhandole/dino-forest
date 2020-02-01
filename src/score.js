class Score {
    constructor() {
        this.score = 0;
        this.scores = [];
        this.isGamePlaying = false;
        this.displayScore = false;
    }

    start() {
        this.isGamePlaying = true;
        this.displayScore = true;
    }

    highScore() {
        this.scores.sort((a, b) => a - b);
        return this.scores[this.scores.length - 1];
    }

    resetScore() {
        this.isGamePlaying = false;
        this.scores.push(this.score);
        this.score = 0;
    }

    increaseScore() {
        this.score += 1;
    }

    draw(ctx) {
        if (this.displayScore) {
            let scoreText = ``;

            // no high score
            if (this.scores.length === 0) {
                scoreText = `${this.score}`;
            }
            // high score exist
            else {
                scoreText = `HI  ${this.highScore()}  ${this.score}`;
            }

            ctx.font = '20px Marker Felt';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'right';
            ctx.strokeText(scoreText, 888, 400);
            ctx.fillText(scoreText, 888, 400);

            // playing
            if (this.isGamePlaying) {
                this.increaseScore();
            }
        }
    }
}

export default Score;