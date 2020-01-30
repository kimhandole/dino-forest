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

class Player {
    constructor(options) {
        this.position = options.position;
        this.spriteSheet = options.spriteSheet;

        this.jumping = false;
        this.jumpingAnimation = 0;
        this.jumpTypeSwitch = true;
        this.jumpCount = 0;
        
        this.walkCycle = 1;
        this.walkspeed = options.walkspeed ? options.walkspeed : 1;

        this.idleSwitch = true;
        this.idleCount = 0;
    }

    getSprite() {
        // console.log(this.position, "POSITION")

        // idle
        if (this.walkCycle === 0 && !this.jumping) {
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
        else if (this.jumping) {
            if (this.jumpingAnimation === 0) {
                if (this.position[1] === 582) {
                    this.jumpingAnimation = 1;
                }
                return this.jumpTypeSwitch ? SPRITES.firstJumpType1 : SPRITES.secondJumpType1;
            } 
            else if (this.jumpingAnimation === 1) {
                if(this.position[1] === 658) {
                    this.jumpingAnimation = 2;
                }
                return this.jumpTypeSwitch ? SPRITES.firstJumpType2 : SPRITES.secondJumpType2;
            }
            else if (this.jumpingAnimation === 2) {
                if (this.position[1] === 712) {
                    this.jumpingAnimation = 0;
                    this.jumpTypeSwitch = !this.jumpTypeSwitch
                }
                return this.jumpTypeSwitch ? SPRITES.firstJumpType3 : SPRITES.secondJumpType3;
            }
        } 
        // walk
        else if (this.walkCycle > 0 && this.walkCycle < 9) {
            this.walkCycle += 1;
            return SPRITES.walk1;
        } else if (this.walkCycle > 0 && this.walkCycle < 17) {
            this.walkCycle += 1;
            return SPRITES.walk2;
        } else if (this.walkCycle > 0 && this.walkCycle < 25) {
            this.walkCycle += 1;
            return SPRITES.walk3;
        } else if (this.walkCycle > 0 && this.walkCycle < 32) {
            this.walkCycle += 1;
            return SPRITES.walk4;
        } else if (this.walkCycle > 0 && this.walkCycle < 40) {
            this.walkCycle += 1;
            return SPRITES.walk5;
        } else if (this.walkCycle > 0 && this.walkCycle < 48) {
            this.walkCycle += 1;
            return SPRITES.walk6;
        } else if (this.walkCycle > 0 && this.walkCycle < 56) {
            this.walkCycle += 1;
            if (this.walkCycle === 56) {
                this.walkCycle = 1;
            }
            return SPRITES.walk7;
        } 
    }

    onGround() {
        return this.position[0] === 84 && this.position[1] >= 712;
    }

    toggleJump() {
        this.jumping = true;
    }

    jump() {
        const gravity = 0.4;
        const initialSpeed = 10;
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
        ctx.clearRect(this.position[0]-12, this.position[1]-12, 48, 48);
        const sprite = this.getSprite();
        // console.log(this.spriteSheet);
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