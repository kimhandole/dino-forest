const SPRITES = {
    idle1: [0, 0, 24, 24],
    idle2: [24, 0, 24, 24],
    walk1: [432, 0, 24, 24],
    walk2: [456, 0, 24, 24],
    walk3: [480, 0, 24, 24],
    walk4: [504, 0, 24, 24],
    walk5: [528, 0, 24, 24],
    walk6: [552, 0, 24, 24],
    walk7: [576, 0, 24, 24],
    firstJumpType1: [48, 0, 24, 24],
    firstJumpType2: [72, 0, 24, 24],
    firstJumpType3: [96, 0, 24, 24],
    firstJumpType4: [120, 0, 24, 24],
    secondJumpType1: [144, 0, 24, 24],
    secondJumpType2: [168, 0, 24, 24],
    secondJumpType3: [192, 0, 24, 24],
    secondJumpType4: [218, 0, 24, 24],
    hurt1: [314, 0, 24, 24],
    hurt2: [338, 0, 24, 24],
    hurt3: [362, 0, 24, 24]
};

class Player {
    constructor(options) {
        this.position = options.position;
        this.spriteSheet = options.spriteSheet;

        this.jumping = false;
        this.jumpCount = 0;
        this.jumpingUp = true;
        
        this.walkCycle = 0;
        this.walkspeed = options.walkspeed ? options.walkspeed : 1;

        this.idleSwitch = true;
        this.idleCount = 0;
    }

    getSprite() {
        // idle
        if (this.walkCycle === 0 && !this.jumping) {
            // increment or reset idleCount
            if (this.idleCount === 15) {
                this.idleCount = 0;
                this.idleSwitch = !this.idleSwitch;
            } else {
                this.idleCount += 1;
            }

            // return idle
            if (this.idleSwitch) {
                return SPRITES.idle1;
            }
            else {
                return SPRITES.idle2;
            }
        } 
        // jump
        else if (!this.onGround()) {
            if (this.jumpingUp && this.position[1] < 618) {
                return SPRITES.firstJumpType1;
            } else if (this.jumpingUp && this.postion[1] < 500) {
                this.jumpingUp = false;
                return SPRITES.firstJumpType2;
            } else if (!this.jumpingUp && this.postion[1] < 500) {
                return SPRITES.firstJumpType3;
            } else if (!this.jumpingUp && this.postion[1] < 618) {
                this.jumpingUp = true;
                return SPRITES.firstJumpType4;
            }

        } 
        // walk
        else if (this.walkCycle < 5) {
            this.walkCycle += 1;
            return SPRITES.walk1;
        } else if(this.walkCycle < 10) {
            this.walkCycle += 1;
            return SPRITES.walk2;
        } else if(this.walkCycle < 15) {
            this.walkCycle += 1;
            return SPRITES.walk3;
        } else if(this.walkCycle < 20) {
            this.walkCycle += 1;
            return SPRITES.walk4;
        } else if (this.walkCycle < 25) {
            this.walkCycle += 1;
            return SPRITES.walk5;
        } else if (this.walkCycle < 30) {
            this.walkCycle += 1;
            return SPRITES.walk6;
        } else if (this.walkCycle < 35) {
            this.walkCycle += 1;
            return SPRITES.walk7;
        } else {
            // this.walkCycle = 0;
        }
    }

    onGround() {
        return this.position[0] === 84 && this.position[1] >= 712;
    }

    toggleJump() {
        this.jumping = true;
    }

    jump() {
        const gravity = 0.40;
        const initialSpeed = 12;
        if (this.jumping) {
            if (this.jumpCount === 0 || !this.onGround()) {
                this.position[1] -= initialSpeed - gravity * this.jumpCount;
                this.jumpCount += 1;
            } else {
                this.position[1] = 712;
                this.jumpCount = 0;
                this.jumping = false;
            }
        }
    }

    update(ctx) {
        this.jump();
        this.draw(ctx);
    }

    draw(ctx) {
        // console.log(this.position);
        ctx.clearRect(this.position[0], this.position[1], 48, 48);
        const sprite = this.getSprite();
        // console.log(this.spriteSheet);
        console.log(sprite);
        ctx.drawImage(
            this.spriteSheet,
            sprite[0],
            sprite[1],
            sprite[2],
            sprite[3],
            this.position[0],
            this.position[1],
            sprite[2],
            sprite[3]
        );
    }

}

export default Player;