class Chicken extends MoveableObject{
    position_y = 370;
    height = 60;
    width = 80;
    health = 40;
    healthbar = new Healthbar();

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png")
        this.loadImages(this.IMAGES_WALKING)
        this.position_x = 800 + (Math.random() * 500);
        this.speed = 0.20 + Math.random() * 0.25;
        this.animate();
        this.healthbar.position_y = this.position_y + 20;
    }

    /**
     * Animiert die Images des Chicken.
     */
    animate() {
        setInterval(() => {
            if(this.isPlaying && this.health > 0) {
                this.moveLeft();
            }
        }, 1000 / 60)
        
        let death = setInterval(() => {
            if(this.isPlaying) {
                this.playAnimation(this.IMAGES_WALKING)
                if(this.health <= 0) {
                    this.loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                    clearInterval(death);
                }
            }
        }, 100)
    }
}