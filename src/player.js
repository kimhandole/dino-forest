const SPRITES = {
    idle1: [0, 0, 24, 24],
    idle2: [24, 0, 24, 24],
    idle3: [48, 0, 24, 24],
    walk1: [408, 0, 24, 24],
    walk2: [432, 0, 24, 24],
    walk3: [456, 0, 24, 24],
    walk4: [480, 0, 24, 24],
    walk5: [504, 0, 24, 24],
    walk6: [528, 0, 24, 24],
    walk7: [552, 0, 24, 24],
    firstJumpType1: [72, 0, 24, 24],
    firstJumpType2: [96, 0, 24, 24],
    firstJumpType3: [120, 0, 24, 24],
    secondJumpType1: [144, 0, 24, 24],
    secondJumpType2: [168, 0, 24, 24],
    secondJumpType3: [192, 0, 24, 24],
    hurt1: [336, 0, 24, 24],
    hurt2: [360, 0, 24, 24],
    hurt3: [384, 0, 24, 24]
};

const PLAYER_HITBOX_OFFSET = {
    posX: 6,
    posY: 6,
    sizeX: 24,
    sizeY: 28,
};

class Player {
    constructor(options) {
        this.position = options.position;
        this.spriteSheet = options.spriteSheet;

        // jump sound
        this.jumpSound = new Audio('./assets/sounds/jump.wav');
        this.jumpSound.volume = 0.2;
        this.jumpSound.muted = true;

        // dead sound
        this.deadSound = new Audio('./assets/sounds/dead.wav');
        this.deadSound.volume = 0.1;
        this.deadSound.muted = true;

        // jump
        this.jumping = false;
        this.jumpingAnimation = 0;
        this.jumpTypeSwitch = true;
        this.jumpCount = 0;
        
        // walk
        this.walkCycle = 0;

        // idle 
        this.idleCount = 0;

        // hurt 
        this.hurt = false
        this.hurtCount = 0;
    }

    getSprite() {
        // hurt 
        if (this.hurt) {
            if (this.hurtCount < 7) {
                this.hurtCount += 1;
                return SPRITES.hurt1;
            } else if (this.hurtCount < 13) {
                this.hurtCount += 1;
                return SPRITES.hurt2;
            } else {
                this.hurtCount += 1;
                if (this.hurtCount === 19) {
                    this.hurtCount = 0;
                    this.hurt = false;
                }
                return SPRITES.hurt3
            }
        }
        // idle
        else if (this.walkCycle === 0 && !this.jumping) {
            if (this.idleCount < 10) {
                this.idleCount += 1;
                return SPRITES.idle1;
            } else if (this.idleCount < 20) {
                this.idleCount += 1;
                return SPRITES.idle2;
            } else {
                this.idleCount += 1;
                if(this.idleCount === 30) {
                    this.idleCount = 0;
                }
                return SPRITES.idle3
            }
        } 
        // jump
        else if (!this.hurt && this.jumping) {
            if (this.jumpingAnimation === 0) {
                if (this.position[1] < 464) {
                    this.jumpingAnimation = 1;
                }
                return this.jumpTypeSwitch ? SPRITES.firstJumpType1 : SPRITES.secondJumpType1;
            } 
            else if (this.jumpingAnimation === 1) {
                if(this.position[1] === 525.2) {
                    this.jumpingAnimation = 2;
                }
                return this.jumpTypeSwitch ? SPRITES.firstJumpType2 : SPRITES.secondJumpType2;
            }
            else if (this.jumpingAnimation === 2) {
                if (this.position[1] === 587.64) {
                    this.jumpingAnimation = 0;
                    this.jumpTypeSwitch = !this.jumpTypeSwitch
                }
                return this.jumpTypeSwitch ? SPRITES.firstJumpType3 : SPRITES.secondJumpType3;
            }
        } 
        // walk
        else if (this.walkCycle > 0 && this.walkCycle < 10) {
            this.walkCycle += 1;
            return SPRITES.walk2;
        } else if (this.walkCycle > 0 && this.walkCycle < 15) {
            this.walkCycle += 1;
            return SPRITES.walk3;
        } else if (this.walkCycle > 0 && this.walkCycle < 20) {
            this.walkCycle += 1;
            return SPRITES.walk4;
        } else if (this.walkCycle > 0 && this.walkCycle < 25) {
            this.walkCycle += 1;
            return SPRITES.walk5;
        } else if (this.walkCycle > 0 && this.walkCycle < 30) {
            this.walkCycle += 1;
            return SPRITES.walk6;
        } else if (this.walkCycle > 0 && this.walkCycle < 35) {
            this.walkCycle += 1;
            if (this.walkCycle === 35) {
                this.walkCycle = 1;
            }
            return SPRITES.walk7;
        } 
    }

    onGround() {
        return this.position[0] === 84 && this.position[1] >= 582;
    }

    toggleJump() {
        this.jumping = true;
        if (this.onGround()) {
            this.jumpSound.play();
        }
    }

    jump() {
        const gravity = 0.44;
        const initialSpeed = 10;
        if (this.jumping) {
            if (this.jumpCount === 0 || !this.onGround()) {
                this.position[1] -= initialSpeed - gravity * this.jumpCount;
                this.jumpCount += 1;
            } else {
                this.position[1] = 582;
                this.jumpCount = 0;
                this.jumping = false;
            }
        }
    }

    collidedWith(obstacle) {
        const playerHitbox = this.hitbox();
        const obstacleHitbox = obstacle.hitbox();
        return !(
            playerHitbox.maxX < obstacleHitbox.minX ||
            playerHitbox.minX > obstacleHitbox.maxX ||
            playerHitbox.maxY < obstacleHitbox.minY ||
            playerHitbox.minY > obstacleHitbox.maxY
        );
    }

    hitbox() {
        return {
            minX: this.position[0] + PLAYER_HITBOX_OFFSET.posX,
            maxX: this.position[0] + PLAYER_HITBOX_OFFSET.posX + PLAYER_HITBOX_OFFSET.sizeX,
            minY: this.position[1] + PLAYER_HITBOX_OFFSET.posY,
            maxY: this.position[1] + PLAYER_HITBOX_OFFSET.posY + PLAYER_HITBOX_OFFSET.sizeY,
        };
    }

    update(ctx) {
        this.jump();
        this.draw(ctx);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, 928, 673);

        const sprite = this.getSprite();
        ctx.drawImage(
            this.spriteSheet,
            sprite[0],
            sprite[1],
            sprite[2],
            sprite[3],
            this.position[0],
            this.position[1],
            36,
            36
        );
    }

}

export default Player;