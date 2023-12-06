 class StartScreen extends MoveableObject{

    height = 480;
    width = 720;
    position_x = 0;
    position_y = 0;
    otherDirection = false;
    IMAGES = ["./img/9_intro_outro_screens/start/startscreen_1.png", "./img/9_intro_outro_screens/start/startscreen_2.png"]


    constructor(world) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.world = world;
    }


 }