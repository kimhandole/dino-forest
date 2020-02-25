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
        this.ctx.clearRect(0, 0, 928, 673);
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.imageLength, this.y);

        if (this.x <= -this.imageLength) {
            this.x = 0;
        }

        this.scrollImage();
    } 
}

export default Background;