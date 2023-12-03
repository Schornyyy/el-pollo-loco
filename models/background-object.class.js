class BackgroundObject extends MoveableObject{

    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super().loadImage(imagePath)
        this.position_y = 480 - this.height;
        this.position_x = x;
    }
}