class ThrowableObject extends MoveableObject {

    IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    SPLASH_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    colliding = false;
    damage = 20;

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.SPLASH_IMAGES);
        this.position_x = x;
        this.position_y = y;
        this.height = 75;
        this.width = 50;
        this.isPlaying = true;
        this.throw()
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            if(this.colliding) {
                this.position_x = this.position_x;
            } else {
                if(this.otherDirection) {
                    this.position_x -= 10;
                } else {
                    this.position_x += 10;
                }
            }
        }, 25);

        setInterval(() => {
                    this.playAnimation(this.IMAGES);
                
        }, 75)
    }

    playSplashAnimation() {
        let i = 0;
        let test = setInterval(() => {
            i++;
            if(i >= this.SPLASH_IMAGES.length) {
                clearInterval(test);
            }
        this.playAnimation(this.SPLASH_IMAGES);
        this.speedY = 0;
        }, 75)
    }

}