class Character extends MoveableObject{

    height = 280;
    position_y = 150;
    coins = 0;
    bottles;
    speed = 10;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ]
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ]
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONG_IDEL = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
    ]

    world;
    lastMove = new Date().getTime();
    lastJump;
    walking_sound = new Audio('audio/steps.mp3');
    hurt_sound = new Audio('audio/pepe_hurt.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    constructor() {
        super().loadImage("./img/2_character_pepe/2_walk/W-21.png")
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDEL);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.world.STATUS === "PLAY") {
                if(this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
                    this.moveRight()
                    this.walking_sound.play();
                    this.lastMove = new Date().getTime();
                }
    
                if(this.world.keyboard.LEFT && this.position_x > 0) {
                    this.moveLeft();
                    this.walking_sound.play();
                    this.otherDirection = true;
                    this.lastMove = new Date().getTime();
                }
    
                if(this.world.keyboard.SPACE && !this.isJumping ) {
                    this.jump()
                    this.lastMove = new Date().getTime();
                }
                
                this.world.camera_x = -this.position_x + 100;

            }
        }, 1000 / 60)

        let animations = setInterval(() => {
            if(this.world.STATUS === "PLAY") {
                let lastMoveInSeconds = new Date().getTime() - this.lastMove;
                lastMoveInSeconds = lastMoveInSeconds / 1000;

                if(this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                    setTimeout(() => {
                        this.world.setStatus("END");
                        clearInterval(animations)
                    }, 200);
                } else if(this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    this.hurt_sound.play();
                }else if(lastMoveInSeconds > 4) {
                    this.playAnimation(this.IMAGES_LONG_IDEL);
                }  else if(lastMoveInSeconds > 1) {
                    this.playAnimation(this.IMAGES_IDLE);
                }  else {
                    if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        // Walk Animation
                        this.playAnimation(this.IMAGES_WALKING);
                        this.walking_sound.play();
                    }   
                }
            }
        }, 75)


        let jump = setInterval(() => {
            let lastJump = new Date().getTime() - this.lastJump;
            lastJump = lastJump / 1000;
            if(this.isAboveGround() && this.isJumping) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.jump_sound.play();
                if(lastJump > 0.2) {
                    this.jump_sound.pause();
                    this.jump_sound.currentTime = 0;
                }
            } 
        }, 110)

        let sounds = setInterval(() => {
            this.clearAllSounds();
        }, 120)
    }

    clearAllSounds() {
        this.walking_sound.pause();
        this.hurt_sound.pause();
    }

    collectCoin(coins, index) {
        this.coins += coins;
        this.world.level.coins.splice(index, 1);
    }

    jump() {
        this.speedY = 20;
    }
}