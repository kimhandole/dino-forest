import Background from './background';
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




class Game {
    constructor(background1Context,
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

        this.draw = this.draw.bind(this);

        this.createBackground();
    }

    setBackground1() {
        this.background1 = new Background(this.background1Context, this.background1Image, 0, 928, 0.8);
        this.background1.draw();
    }

    setBackground2() {
        this.background2 = new Background(this.background2Context, this.background2Image, 0, 928, 0.9);
        this.background2.draw();
    }

    setBackground3() {
        this.background3 = new Background(this.background2Context, this.background2Image, 0, 928, 1);
        this.background3.draw();
    }

    setBackground4() {
        this.background4 = new Background(this.background4Context, this.background4Image, 0, 928, 1);
        this.background4.draw();
    }

    setBackground5() {
        this.background5 = new Background(this.background5Context, this.background5Image, 0, 928, 2);
        this.background5.draw();
    }

    setBackground6() {
        this.background6 = new Background(this.background6Context, this.background6Image, 0, 928, 2);
        this.background6.draw();
    }

    setBackground7() {
        this.background7 = new Background(this.background7Context, this.background7Image, 0, 928, 3);
        this.background7.draw();
    }

    setBackground8() {
        this.background8 = new Background(this.background8Context, this.background8Image, 0, 928, 4);
        this.background8.draw();
    }

    setBackground9() {
        this.background9 = new Background(this.background9Context, this.background9Image, 0, 928, 5);
        this.background9.draw();
    }

    setBackground10() {
        this.background10 = new Background(this.background10Context, this.background10Image, 0, 928, 6);
        this.background10.draw();
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

    draw() {
        // this.background1.draw();
    }
}

export default Game;