import Background from './background';
import Player from './player';
import Fireplace from './fireplace';
import Torch from './torch';
import Score from './score';
import Display from './display';
import Util from './util';
import Firebase from './firebase';

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
        // this.handleKeyboard = this.handleKeyboard.bind(this);
        this.handleKeyboardEnter = this.handleKeyboardEnter.bind(this);
        this.handleKeyboardR = this.handleKeyboardR.bind(this);
        this.handleKeyboardSpacebar = this.handleKeyboardSpacebar.bind(this);
        this.draw = this.draw.bind(this);

        // obstacles
        this.obstacles = [];
        this.obstacleInterval = 0;
        this.obstaclesLimit = 50;
        this.spawnRate = 40;
        this.nextSpawn = this.spawnRate + Util.getRandomIntInclusive(0, 150);
    
        // initialize
        this.isMuted = true;
        this.isGamePlaying = false;
        this.isGameOver = false;
        this.didUserJump = false;
        this.isFirstGame = true;
        this.score = new Score();
        this.display = new Display();
        this.firebase = new Firebase();
        
        // function calls
        this.setSounds();
        this.setButtonListeners();
        this.setForm();
        this.setButtonClickSounds();
        this.setSaveScoreButton();
        this.createBackground();
        this.createPlayer();
        this.setKeyboardListeners("enter");
    }

    // keyboards
    handleKeyboardEnter(event) {
        // enter
        if (event.keyCode === 13) {
            event.preventDefault();
            if (!this.isGamePlaying) {
                this.start();
            }
        }
    }

    handleKeyboardSpacebar(event) {
        // space bar
        if (event.keyCode === 32) {
            event.preventDefault();
            if (this.isGamePlaying) {
                this.player.toggleJump();
            }
            // turn off game info
            if (!this.didUserJump) {
                this.didUserJump = true;
            }
        }
    }

    handleKeyboardR(event) {
        // reset
        if (event.keyCode === 82) {
            event.preventDefault();
            if (!this.isGamePlaying) {
                this.start();
            }
        }
    }

    setKeyboardListeners(key) {
        // document.addEventListener('keydown', this.handleKeyboard);
        switch (key) {
            case "r":
                document.addEventListener('keydown', this.handleKeyboardR);
                break;
            case "enter":
                document.addEventListener('keydown', this.handleKeyboardEnter);
                break;
            case "spacebar":
                document.addEventListener('keydown', this.handleKeyboardSpacebar);
                break;
            default:
                break;
        }
    }

    removeKeyboardListeners(key) {
        // document.removeEventListener('keydown', this.handleKeyboard);
        switch (key) {
            case "r":
                document.removeEventListener('keydown', this.handleKeyboardR);
                break;
            case "enter":
                document.removeEventListener('keydown', this.handleKeyboardEnter);
                break;
            case "spacebar":
                document.removeEventListener('keydown', this.handleKeyboardSpacebar);
                break;
            default:
                break;
        }
    }

    // button listeners
    setButtonListeners() {
        // mute
        document.getElementById("mute").addEventListener("click", () => {

            // mute button image
            if (this.isMuted) {
                document.getElementById("mute").src = "../assets/images/display/speaker.png";
            } else {
                document.getElementById("mute").src = "../assets/images/display/mute.png";
            }

            // unmute info text
            document.getElementsByClassName("unmute-text")[0].classList.add("unmute-text-none");

            // intro
            if (!this.isGamePlaying && !this.isGameOver) {
                if (this.isMuted) {
                    this.clickSound.play();
                    this.isMuted = false;
                    this.introSound.muted = false;
                    this.backgroundSound.muted = false;
                    this.gameOverSound.muted = false;
                    this.player.jumpSound.muted = false;
                    this.player.deadSound.muted = false;

                    this.introSound.play();
                } else {
                    this.isMuted = true;
                    this.introSound.muted = true;
                    this.backgroundSound.muted = true;
                    this.gameOverSound.muted = true;
                    this.player.jumpSound.muted = true;
                    this.player.deadSound.muted = true;
                }
            } 
            // during game play
            else if (this.isGamePlaying && !this.isGameOver) {
                if (this.isMuted) {
                    this.clickSound.play();
                    this.isMuted = false;
                    this.backgroundSound.muted = false;
                    this.gameOverSound.muted = false;
                    this.player.jumpSound.muted = false;
                    this.player.deadSound.muted = false;

                    this.backgroundSound.play();
                } else {
                    this.isMuted = true
                    this.backgroundSound.muted = true;
                    this.gameOverSound.muted = true;
                    this.player.jumpSound.muted = true;
                    this.player.deadSound.muted = true;
                }
            }
            // game over
            else if (!this.isGamePlaying && this.isGameOver) {
                if (this.isMuted) {
                    this.clickSound.play();
                    this.isMuted = false;
                    this.backgroundSound.muted = false;
                    this.gameOverSound.muted = false;
                    this.player.jumpSound.muted = false;
                    this.player.deadSound.muted = false;

                    this.gameOverSound.play();

                } else {
                    this.isMuted = true;
                    this.backgroundSound.muted = true;
                    this.gameOverSound.muted = true;
                    this.player.jumpSound.muted = true;
                    this.player.deadSound.muted = true;
                }
            }
        });
    }

    // backgrounds
    setBackground1() {
        this.background1 = new Background(this.background1Context, this.background1Image, -120, 928, 0);
        this.background1.draw();
    }

    setBackground2() {
        this.background2 = new Background(this.background2Context, this.background2Image, -120, 928, 0);
        this.background2.draw();
    }
    // light
    setBackground3() {
        this.background3 = new Background(this.background2Context, this.background2Image, -120, 928, 0);
        this.background3.draw();
    }

    setBackground4() {
        this.background4 = new Background(this.background4Context, this.background4Image, -120, 928, 0);
        this.background4.draw();
    }

    setBackground5() {
        this.background5 = new Background(this.background5Context, this.background5Image, -120, 928, 0);
        this.background5.draw();
    }
    // light
    setBackground6() {
        this.background6 = new Background(this.background6Context, this.background6Image, -120, 928, 0);
        this.background6.draw();
    }
    // tree bottom
    setBackground7() {
        this.background7 = new Background(this.background7Context, this.background7Image, -120, 928, 0);
        this.background7.draw();
    }
    // tree top
    setBackground8() {
        this.background8 = new Background(this.background8Context, this.background8Image, -120, 928, 0);
        this.background8.draw();
    }
    // ground
    setBackground9() {
        this.background9 = new Background(this.background9Context, this.background9Image, -120, 928, 0);
        this.background9.draw();
    }
    // outter ground
    setBackground10() {
        this.background10 = new Background(this.background10Context, this.background10Image, -120, 928, 0);
        this.background10.draw();
    }

    setSounds() {
        this.introSound = new Audio("../assets/sounds/intro.mp3");
        this.introSound.loop = true;
        this.introSound.muted = true;
        this.introSound.volume = 0.5;

        this.backgroundSound = new Audio("../assets/sounds/background.mp3");
        this.backgroundSound.loop = true;
        this.backgroundSound.muted = true;
        this.backgroundSound.volume = 0.5;
        
        this.gameOverSound = new Audio("../assets/sounds/gameover.mp3");
        this.gameOverSound.loop = true;
        this.gameOverSound.muted = true;
        this.gameOverSound.volume = 0.5;

        this.clickSound = new Audio("../assets/sounds/click.wav");
        this.clickSound.volume = 0.3;
    }

    setButtonClickSounds() {
        document.getElementById("email").addEventListener("click", () => {
            if (!this.isMuted) {
                this.clickSound.play();
            }
        });

        document.getElementById("github").addEventListener("click", () => {
            if (!this.isMuted) {
                this.clickSound.play();
            }
        });

        document.getElementById("angelist").addEventListener("click", () => {
            if (!this.isMuted) {
                this.clickSound.play();
            }
        });

        document.getElementById("linkedin").addEventListener("click", () => {
            if (!this.isMuted) {
                this.clickSound.play();
            }
        });

        document.getElementById("creater").addEventListener("click", () => {
            if (!this.isMuted) {
                this.clickSound.play();
            }
        });

        document.getElementById("save-name").addEventListener("submit", () => {
            if (!this.isMuted) {
                this.clickSound.play();
            }
        });
    }

    setForm() {
        var form = document.getElementById("save-name");
        function handleForm(event) { event.preventDefault(); }
        form.addEventListener('submit', handleForm);
    }

    setSaveScoreButton() {
        const nickname = document.getElementById("name");

        document.getElementById("save").addEventListener("click", () => {
            if (nickname.value !== "") {
                nickname.style.borderColor = "white";
                this.firebase.saveScore(nickname.value, this.score.highScore());
            } else {
                nickname.style.borderColor = "red";
            }
        });
    }

    setPlayer() {
        this.player = new Player({ position: [84, 582], spriteSheet: this.playerImage });

        // start game
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

    generateRandomObstacle(speed) {
        let obstacle = null;
        const obstacleTypes = ["torch", "fireplace1", "fireplace2"];
        const obstacleType = obstacleTypes[Math.floor(Math.random()*obstacleTypes.length)];

        switch (obstacleType) {
            case "torch":
                obstacle = new Torch({ position: [928, 548], speed: speed, spriteSheetSrc: TorchURL });
                break;
            case "fireplace1":
                obstacle = new Fireplace({ position: [928, 548], speed: speed, spriteSheetSrc: Fireplace1URL });
                break;
            case "fireplace2":
                obstacle = new Fireplace({ position: [928, 548], speed: speed, spriteSheetSrc: Fireplace2URL });
                break;
            default:
                obstacle = new Torch({ position: [928, 548], speed: speed, spriteSheet: TorchURL });
        }

        return obstacle;
    }

    createObstacles(speed) {
        if (this.obstacleInterval === 0 && this.obstacles.length < this.obstaclesLimit) {
            this.obstacles.push(this.generateRandomObstacle(speed));
            this.obstacleInterval += 1;
        } else if (this.obstacleInterval === this.nextSpawn) {
            this.obstacleInterval = 0;
            this.nextSpawn = this.spawnRate + Util.getRandomIntInclusive(0, 150);
        } else {
            this.obstacleInterval += 1;
        } 
    }

    increaseSpeed(offset) {
        this.background1.speed = this.background1.speed + offset;
        this.background2.speed = this.background2.speed + offset;
        this.background3.speed = this.background3.speed + offset;
        this.background4.speed = this.background4.speed + offset;
        this.background5.speed = this.background5.speed + offset;
        // light
        this.background6.speed = this.background6.speed + offset;
        // bottom tree
        this.background7.speed = this.background7.speed + offset;
        // top tree
        this.background8.speed = this.background8.speed + offset;
        // ground
        this.background9.speed = this.background9.speed + offset;
        // outter ground
        this.background10.speed = this.background10.speed + offset;

        // obstacles
        this.obstacles.map(obstacle => obstacle.speed = this.background9.speed);
    }

    start() {
        // remove key listeners
        if (this.isFirstGame) {
            this.removeKeyboardListeners("enter");
            this.isFirstGame = false;
        } else {
            this.removeKeyboardListeners("r");
        }
        // set key listeners
        this.setKeyboardListeners("spacebar");

        // get score on background
        this.firebase.getScores();

        // hide scoreboard
        document.getElementsByClassName("scoreboard")[0].classList.add("hide");
        // hide save score
        document.getElementsByClassName("save-score")[0].classList.add("hide");
        // hide author 
        document.getElementsByClassName("author")[1].classList.add("hide");

        // sound
        this.introSound.pause();
        this.gameOverSound.pause();
        this.backgroundSound.currentTime = 0;
        this.backgroundSound.play();
        
        // logic
        this.isGameOver = false;
        this.isGamePlaying = true;
        this.display.isGameOver = false

        // canvas
        this.background1.speed = 0.2;
        this.background2.speed = 0.4;
        this.background3.speed = 0.6;
        this.background4.speed = 0.8;
        this.background5.speed = 1.1;
        // light
        this.background6.speed = 1.5;
        // bottom tree
        this.background7.speed = 1.6;
        // top tree
        this.background8.speed = 1.9;
        // ground
        this.background9.speed = 1.9;
        // outter ground
        this.background10.speed = 2.1;

        this.player.walkCycle = 1;

        this.score.start();
    }

    stop() {      
        // set key listeners
        this.setKeyboardListeners("r");
        // remove key listeners
        this.removeKeyboardListeners("spacebar");

        // reset name input 
        this.firebase.resetInput();

        // show scoreboard
        document.getElementsByClassName("scoreboard")[0].classList.remove("hide");
        // show save score
        document.getElementsByClassName("save-score")[0].classList.remove("hide");
        // show author 
        document.getElementsByClassName("author")[1].classList.remove("hide");

        // sound
        this.backgroundSound.pause();
        this.gameOverSound.currentTime = 0;
        this.gameOverSound.play();

        // canvas
        this.background1.speed = 0;
        this.background2.speed = 0;
        this.background3.speed = 0;
        this.background4.speed = 0;
        this.background5.speed = 0;
        this.background6.speed = 0;
        this.background7.speed = 0;
        this.background8.speed = 0;
        this.background9.speed = 0;
        this.background10.speed = 0;
        this.obstacles.map(obstacle => obstacle.speed = 0);
        this.player.walkCycle = 0;
        this.isGamePlaying = false;
        this.obstacles = [];
    }

    draw() {
        // repeat
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

        if (this.isGamePlaying) {
            // game info
            if (!this.didUserJump) {
                this.display.info(this.gameContext);
            }

            // create obstacles
            this.createObstacles(this.background9.speed);
            let obstacleToDeleteIdx = null;

            this.obstacles.forEach((obstacle, idx) => {
                obstacle.step(this.gameContext);
                if (obstacle.outOfBounds()) {
                    obstacleToDeleteIdx = idx;
                }

                // game over
                if (!this.player.hurt && this.player.collidedWith(obstacle)) {
                    this.player.hurt = true;
                    this.player.deadSound.play();
                    this.stop();
                    this.score.resetScore();
                    this.display.isGameOver = true;
                    this.isGameOver = true;
                }
            });

            // delete obstacle
            if (obstacleToDeleteIdx) {
                this.obstacles = this.obstacles.slice(obstacleToDeleteIdx + 1);
                const speedOffset = 0.2;
                this.increaseSpeed(speedOffset);
            }

        } else {
            this.display.draw(this.gameContext);
        }

        // score
        this.score.draw(this.gameContext);
    }
}

export default Game;