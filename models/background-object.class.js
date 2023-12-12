
class BackgroundObject extends MoveableObject{

    width = 720;
    height = 480;

    /**
     * Wir jedes mal generiert sobald man new BackgroundObject() aufruft.
     * 
     * @param {*} imagePath - der Pfad zum Image das angezeigt werden soll
     * @param {*} x - die X Cordinate auf der das Image angezeigt werden soll
     */

    constructor(imagePath, x) {
        super().loadImage(imagePath)
        this.position_y = 480 - this.height;
        this.position_x = x;
    }
}