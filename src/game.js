import Background from './background';
import Player from './player';
import Fireplace from './fireplace';
import Torch from './torch';
import Util from './util';


// load image files
const Background1URL = require("../assets/images/background/background-layer1.png");
const Background2URL = require("../assets/images/background/background-layer2.png");
const Background3URL = require("../assets/images/background/background-layer3.png");
const Background4URL = require("../assets/images/background/background-layer4.png");
const Background5URL = require("../assets/images/background/background-layer5.png");
const Background6URL = require("../assets/images/background/background-layer6.png");
const Background7URL = require("../assets/images/background/background-layer7.png");
const Background8URL = require("../assets/images/background/background-layer8.png");
const Background9URL = require("../assets/images/background/background-layer9.png");
const Background10URL = require("../assets/images/background/background-layer10.png");

const Player1URL = require("../assets/images/player/dino-red.png");
const Player2URL = require("../assets/images/player/dino-blue.png");
const Player3URL = require("../assets/images/player/dino-green.png");
const Player4URL = require("../assets/images/player/dino-yellow.png");
const players = [Player1URL, Player2URL, Player3URL, Player4URL];

const TorchURL = require("../assets/images/obstacle/torch.png");
const Fireplace1URL = require("../assets/images/obstacle/fireplace1.png");
const Fireplace2URL = require("../assets/images/obstacle/fireplace2.png");



class Game {
    constructor (
        gameCanvas,
        gameContext,
        background1Context,
        background2Context, 
        background3Context, 
        background4Context, 
        background5Context,
        background6Context,
        background7Context,
        background8Context,
        background9Context,
        background10Context
    ) {
        // game ctx, canvas
        this.gameCanvas = gameCanvas;
        this.gameContext = gameContext;

        // background
        this.background1Context = background1Context;
        this.background2Context = background2Context;
        this.background3Context = background3Context;
        this.background4Context = background4Context;
        this.background5Context = background5Context;
        this.background6Context = background6Context;
        this.background7Context = background7Context;
        this.background8Context = background8Context;
        this.background9Context = background9Context;
        this.background10Context = background10Context;

        this.setBackground1 = this.setBackground1.bind(this);
        this.setBackground2 = this.setBackground2.bind(this);
        this.setBackground3 = this.setBackground3.bind(this);
        this.setBackground4 = this.setBackground4.bind(this);
        this.setBackground5 = this.setBackground5.bind(this);
        this.setBackground6 = this.setBackground6.bind(this);
        this.setBackground7 = this.setBackground7.bind(this);
        this.setBackground8 = this.setBackground8.bind(this);
        this.setBackground9 = this.setBackground9.bind(this);
        this.setBackground10 = this.setBackground10.bind(this);

        this.setPlayer = this.setPlayer.bind(this);

        // functions
        this.jump = this.jump.bind(this);
        this.draw = this.draw.bind(this);

        // function calls
        this.createBackground();
        this.createPlayer();
        this.setButtonListeners();


        // obstacles
        this.obstacles = [];
        this.obstacleInterval = 0;
        this.obstaclesLimit = 30;
        this.spawnRate = 300;
        this.nextSpawn = this.spawnRate + Util.getRandomIntInclusive(0, 25);
    }

    jump(event) {
        if (event.keyCode === 32) {
            event.preventDefault();
            this.player.toggleJump();
        }
    }

    // button listeners
    setButtonListeners() {
        document.addEventListener('keydown', this.jump);
    }

    // backgrounds
    setBackground1() {
        this.background1 = new Background(this.background1Context, this.background1Image, 0, 928, 0.1);
        this.background1.draw();
    }

    setBackground2() {
        this.background2 = new Background(this.background2Context, this.background2Image, 0, 928, 0.3);
        this.background2.draw();
    }
    // light
    setBackground3() {
        this.background3 = new Background(this.background2Context, this.background2Image, 0, 928, 0.41);
        this.background3.draw();
    }

    setBackground4() {
        this.background4 = new Background(this.background4Context, this.background4Image, 0, 928, 0.6);
        this.background4.draw();
    }

    setBackground5() {
        this.background5 = new Background(this.background5Context, this.background5Image, 0, 928, 0.98);
        this.background5.draw();
    }
    // light
    setBackground6() {
        this.background6 = new Background(this.background6Context, this.background6Image, 0, 928, 1.6);
        this.background6.draw();
    }
    // tree bottom
    setBackground7() {
        this.background7 = new Background(this.background7Context, this.background7Image, 0, 928, 1.5);
        this.background7.draw();
    }
    // tree top
    setBackground8() {
        this.background8 = new Background(this.background8Context, this.background8Image, 0, 928, 1.8);
        this.background8.draw();
    }
    // ground
    setBackground9() {
        this.background9 = new Background(this.background9Context, this.background9Image, 0, 928, 1.8);
        this.background9.draw();
    }
    // outter ground
    setBackground10() {
        this.background10 = new Background(this.background10Context, this.background10Image, 0, 928, 2.0);
        this.background10.draw();
    }

    setPlayer() {
        this.player = new Player({ position: [84, 712], spriteSheet: this.playerImage });
        this.draw();
    }

    createPlayer() {
        this.playerImage = new Image();
        this.playerImage.addEventListener("load", this.setPlayer);
        const player = players[Math.floor(Math.random()*players.length)];
        this.playerImage.src = player;
    }

    createBackground() {
        this.background1Image = new Image();
        this.background1Image.addEventListener("load", this.setBackground1);
        this.background1Image.src = Background1URL;

        this.background2Image = new Image();
        this.background2Image.addEventListener("load", this.setBackground2);
        this.background2Image.src = Background2URL;

        this.background3Image = new Image();
        this.background3Image.addEventListener("load", this.setBackground3);
        this.background3Image.src = Background3URL;

        this.background4Image = new Image();
        this.background4Image.addEventListener("load", this.setBackground4);
        this.background4Image.src = Background4URL;

        this.background5Image = new Image();
        this.background5Image.addEventListener("load", this.setBackground5);
        this.background5Image.src = Background5URL;

        this.background6Image = new Image();
        this.background6Image.addEventListener("load", this.setBackground6);
        this.background6Image.src = Background6URL;

        this.background7Image = new Image();
        this.background7Image.addEventListener("load", this.setBackground7);
        this.background7Image.src = Background7URL;

        this.background8Image = new Image();
        this.background8Image.addEventListener("load", this.setBackground8);
        this.background8Image.src = Background8URL;

        this.background9Image = new Image();
        this.background9Image.addEventListener("load", this.setBackground9);
        this.background9Image.src = Background9URL;

        this.background10Image = new Image();
        this.background10Image.addEventListener("load", this.setBackground10);
        this.background10Image.src = Background10URL;
    }

    generateRandomObstacle() {
        let obstacle = null;
        const obstacleTypes = ["torch", "fireplace1", "fireplace2"];
        const obstacleType = obstacleTypes[Math.floor(Math.random()*obstacleTypes.length)];

        switch (obstacleType) {
            case "torch":
                obstacle = new Torch({ position: [928, 669], speed: 1.8, spriteSheetSrc: TorchURL });
                break;
            case "fireplace1":
                obstacle = new Fireplace({ position: [928, 669], speed: 1.8, spriteSheetSrc: Fireplace1URL });
                break;
            case "fireplace2":
                obstacle = new Fireplace({ position: [928, 669], speed: 1.8, spriteSheetSrc: Fireplace2URL });
                break;
            default:
                obstacle = new Torch({ position: [928, 669], speed: 1.8, spriteSheet: TorchURL });
        }

        return obstacle;
    }

    createObstacles() {
        if (this.obstacleInterval === 0 && this.obstacles.length < this.obstaclesLimit) {
            this.obstacles.push(this.generateRandomObstacle());
            this.obstacleInterval += 1;
        } else if (this.obstacleInterval === this.nextSpawn) {
            this.obstacleInterval = 0;
            this.nextSpawn = this.spawnRate + Util.getRandomIntInclusive(0, 25);
        } else {
            this.obstacleInterval += 1;
        } 
    }

    draw() {
        requestAnimationFrame(this.draw)

        // backgrounds
        this.background1.draw();
        this.background2.draw();
        this.background3.draw();
        this.background4.draw();
        this.background5.draw();
        this.background6.draw();
        this.background7.draw();
        this.background8.draw();
        this.background9.draw();
        this.background10.draw();

        // player
        this.player.update(this.gameContext)

        // obstacles 
        this.createObstacles();
        let obstacleToDeleteIdx = null;

        this.obstacles.forEach((obstacle, idx) => {
            obstacle.step(this.gameContext);
            if (obstacle.outOfBounds()) {
                obstacleToDeleteIdx = idx;
            }
            if (!this.player.hurt && this.player.collidedWith(obstacle)) {
                this.player.hurt = true;
            }
        });

        // delete obstacle
        if (obstacleToDeleteIdx) {
            this.obstacles = this.obstacles.slice(obstacleToDeleteIdx + 1);
        }
    }
}

export default Game;