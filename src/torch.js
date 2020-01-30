import Obstacle from './obstacle';

const TORCH_SPRITES = {
    idle1: [0, 0, 64, 64],
    idle2: [64, 0, 64, 64],
    idle3: [128, 0, 64, 64],
    idle4: [192, 0, 64, 64],
    idle5: [256, 0, 64, 64],
    idle6: [320, 0, 64, 64]
};

const TORCH_HITBOX_OFFSET = {
    posX: 24,
    posY: 20,
    sizeX: 62,
    sizeY: 120,
};

class Torch extends Obstacle {
    constructor(options) {
        options.hitboxOffset = TORCH_HITBOX_OFFSET;
        super(options);

        this.spriteSheet = new Image();
        this.spriteSheet.src = options.spriteSheetSrc;
        this.idleCount = 0;
    }

    getSprite() {
        // idle
        if (this.idleCount < 10) {
            this.idleCount += 1;
            return TORCH_SPRITES.idle1;
        } else if (this.idleCount < 20) {
            this.idleCount += 1;
            return TORCH_SPRITES.idle2;
        } else if (this.idleCount < 30) {
            this.idleCount += 1;
            return TORCH_SPRITES.idle3;
        } else if (this.idleCount < 40) {
            this.idleCount += 1;
            return TORCH_SPRITES.idle4;
        } else if (this.idleCount < 50) {
            this.idleCount += 1;
            return TORCH_SPRITES.idle5;
        } else {
            this.idleCount += 1;
            if(this.idleCount === 60) {
                this.idleCount = 0;
            }
            return TORCH_SPRITES.idle6;
        }
    }

    draw(ctx) {
        const sprite = this.getSprite();
        ctx.drawImage(
            this.spriteSheet,
            sprite[0],
            sprite[1],
            sprite[2],
            sprite[3],
            this.position[0],
            this.position[1],
            64,
            64
        );
    }
}

export default Torch;