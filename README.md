# Dino Forest ([live](https://kimhandole.github.io/dino-forest/dist/))

## Background
Dino Forest is a clone of chrome t-rex endless runner game. The player gets points for running longer distances.

## Instructions
* Select sound option by a mouse click
* Press enter to start play
* Press space bar to jump
* Press enter to retry 

## Technologies
* HTML5 / CSS3
* HTML5 canvas
* JavaScript

## Features and Implementation
No additional library (ex: jQuery) were used, only native JavaScript DOM manipulation and HTML 5 canvas

### Parallax Background
![Background Layers](background-layers.png)
![Background](background.png)

### Retry Transition Animation

### Dino Character

### Jump Animation
Two types of jump sprite will triggered alternatively.
```
return this.jumpTypeSwitch ? SPRITES.firstJumpType1 : SPRITES.secondJumpType1;
```

### Obstacle 
#### Torch
#### Fireplace

### High Score
Score object keeps track of the high score of player
```
class Score {
    constructor() {
        this.score = 0;
        this.scores = [];
        ...
    }

    highScore() {
        this.scores.sort((a, b) => a - b);
        return this.scores[this.scores.length - 1];
    }
    ...
}
```

### Sound
Mute and unmute are available all time; intro, during game play, and game over.
```
// intro
if (!this.isGamePlaying && !this.isGameOver) {
    if (this.isMuted) {
        ...
    } else {
        ...
    }
} 
// during game play
else if (this.isGamePlaying && !this.isGameOver) {
    if (this.isMuted) {
        ...
    } else {
        ...
    }
}
// game over
else if (!this.isGamePlaying && this.isGameOver) {
    if (this.isMuted) {
        ...
    } else {
        ...
    }
}
```
## Legal and Credit
All art and music assets are used for educational purpose on this project.
* Dino charaters are made by [Arks](https://twitter.com/scissormarks)
* Background layers are made by [EderMuniZz](https://twitter.com/EderMuniZz)
* Torch and fireplaces are made by [OcO](https://twitter.com/oco_93)
* Icons are made by [Freepik](https://www.flaticon.com/authors/freepik"), [Pixel perfect](https://www.flaticon.com/authors/pixel-perfect"), [Google](https://www.flaticon.com/authors/google)
* Musics are from [Ragnarok 2](http://www.playragnarok2.com/), [Uncharted Waters Online](https://uwo.papayaplay.com/uwo.do), [Lost Ark](https://www.mmorpg.com/lost-ark)