class ThrowableObject extends MoveableObject {

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES);
        this.position_x = x;
        this.position_y = y;
        this.height = 75;
        this.width = 50;
        this.throw()
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.position_x += 10;
        }, 25);

        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 75)
    }

}