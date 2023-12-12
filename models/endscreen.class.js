class Endscreen extends MoveableObject {

    height = 480;
    width = 720;
    position_x = 0;
    position_y = 0;
    IMAGES = [
        './img/9_intro_outro_screens/game_over/game over!.png',
        './img/9_intro_outro_screens/game_over/game over.png',
        './img/9_intro_outro_screens/game_over/oh no you lost!.png',
        './img/9_intro_outro_screens/game_over/you lost.png'
    ]
    otherDirection = false;

    constructor(world) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.world = world;
        this.otherDirection = false;
    }

    /**
     * 
     * @returns random Gameover Screen
     */
    loadRandomImage() {
        let i = Math.round(Math.random() * this.IMAGES.length);
        return this.loadImage(this.IMAGES[i]);
    }
}