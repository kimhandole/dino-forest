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
        options.hitboxOffset = TREE_HITBOX_OFFSET;
        super(options);
    }

}

export default Torch;