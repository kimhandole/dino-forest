class Background {

    constructor(ctx, image, posY, imageLength, speed) {
        this.image = image;
        this.speed = speed;
        this.x = 0;
        this.y = posY;
        this.imageLength = imageLength;
        this.ctx = ctx;
    }

    scrollImage() {
        this.x -= this.speed;
    }


    draw() {
        this.ctx.clearRect(0, 0, 928, 793);
        this.ctx.drawImage(this.image, 0, 0, 928, 793, 0, 0, 928, 793);
        this.ctx.drawImage(this.image, this.x + this.imageLength, this.y);

        if (this.imageLength < 928) {
            this.ctx.drawImage(this.image, this.x + this.imageLength * 2, this.y);
        }

        if (this.x <= -this.imageLength) {
            this.x = 0;
        }

        this.scrollImage();
    }
}

export default Background;