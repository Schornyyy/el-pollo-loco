class Endboss extends MoveableObject {

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    height = 300;
    width = 200;
    position_y = 150;
    health = 200;
    dead = false;
    watchedPlayer = false;
    attack = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT)
        this.animate();
    }

    /**
     * Animiert die Images des Endbosses.
     */
    animate() {
        let ani = setInterval(() => {
            if(this.dead) {
                this.playAnimation(this.IMAGES_DEAD)
                setTimeout(() => {
                    clearInterval(ani);
                }, this.IMAGES_DEAD.length * 200)
            } else if(this.watchedPlayer && !this.attack){
                this.playAnimation(this.IMAGES_ALERT);
                setTimeout(() => {
                    this.attack = true;
                }, 200 * this.IMAGES_ALERT.length)
            } else if(this.attack && this.watchedPlayer) {
                if(this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT)
                } else {
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
        }, 200)
    }

}