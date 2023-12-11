class World {

    charakter = new Character();
    level = createLevel();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthbar = new Healthbar();
    coinbar = new Coinbar();
    bottlebar = new BottleBar()
    throwableObjects = [];
    startScreen = new StartScreen(this);
    endScreen;
    STATUS = "START";
    splash_sound = new Audio('audio/bottle.mp3');
    chicken_hurt = new Audio('audio/chicken_hurt.mp3');
    music = new Audio('audio/music.mp3');

    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.healthbar.position_x = this.camera_x + 10;
        this.coinbar.position_x += this.camera_x;
        this.bottlebar.position_x += this.coinbar.position_x - 60;
        this.charakter.bottles = this.level.bottles;
        this.endScreen = new Endscreen(this);
        this.bossAttacksPlayer();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkIfPlayerCanSeeEndboss();
        }, 100)
    }

    restart() {

    }

    setStatus(status) {
        switch (status) {
            case "START":
                document.getElementById("start").sytle = "display: none;";
                break;
            case "PAUSE":
                this.setAllToPause(this.level.enemies);
                this.setAllToPause(this.level.clouds);
                this.setAllToPause(this.level.coins);
                this.charakter.isPlaying = false;
                this.music.pause();
                break;
            case "PLAY":
                this.setAllToPlaying(this.level.enemies);
                this.setAllToPlaying(this.level.clouds);
                this.setAllToPlaying(this.level.coins);
                this.charakter.isPlaying = true;
                this.music.volume = 0.02;
                this.music.play();
                document.getElementById("pause").style = 'display: none';
                break;
            case "END":
                this.setAllToPause(this.level.enemies);
                this.setAllToPause(this.level.clouds);
                this.setAllToPause(this.level.coins);
                this.charakter.isPlaying = false;
                document.getElementById("pause").style = 'display: flex';
                document.getElementById("continue").style = 'display: none';
                break;
            default:
                break;
        }
        this.STATUS = status;
    }

    setAllToPause(arr) {
        arr.forEach((e) => {
            e.isPlaying = false;
        })
    }

    setAllToPlaying(arr) {
        arr.forEach((e) => {
            e.isPlaying = true;
        })
    }

    SetMoveableObjectToPause(mo) {
        mo.isPlaying = false;
    }

    checkThrowObjects() {
        if(this.keyboard.D) {
            if(this.level.bottleAmount > 0) {
                let percantage = ((this.throwableObjects.length / this.level.bottleAmount) * 100);
                this.bottlebar.setPercentage(percantage);
                let bottle = new ThrowableObject(this.charakter.position_x + 50, this.charakter.position_y + 100);
                if(this.charakter.otherDirection) {
                    bottle = new ThrowableObject(this.charakter.position_x - 50, this.charakter.position_y + 100);
                    bottle.otherDirection = true;
                }
                this.throwableObjects.push(bottle)
                this.level.bottleAmount --;
            }
        }
    }

    checkCollisions() {
        if(this.STATUS == "PLAY") {
            this.level.enemies.forEach(enemy => {
                if(this.charakter.isColliding(enemy)) {
                    if(enemy.health > 0) {
                        this.charakter.hit()
                        this.healthbar.setPercentage(this.charakter.energy)
                    }
                }
            })
    
            this.level.coins.forEach((coin, index) => {
                if(this.charakter.isColliding(coin)) {
                    this.charakter.collectCoin(1, index);
                    let percantage = (100  * this.charakter.coins) / this.level.coinsAmount;
                    this.coinbar.setPercentage(percantage);
                }
            })

            this.throwableObjects.forEach((bottle, bindex) => {
                this.level.enemies.forEach((enemy, index) => {
                    if(bottle.isColliding(enemy)) {
                        this.splash_sound.currentTime = 1;
                        this.splash_sound.play();
                        this.chicken_hurt.play();
                        if(enemy.health > 0) {
                            bottle.colliding = true;
                            bottle.playSplashAnimation();
                            enemy.health -= bottle.damage;
                            enemy.healthbar.setPercentage(enemy.health);
                            setTimeout(() => {
                                this.throwableObjects.splice(bindex, 1);
                            }, 100);
                        } else {
                            if(enemy instanceof Endboss) {
                                enemy.dead = true;
                            }
                        }
                    }
                })
            })

        }
    }

    checkIfPlayerCanSeeEndboss() {
        if(this.STATUS === "PLAY") {
            let endboss = this.level.enemies[this.level.enemies.length-1];
            if((endboss.position_x - 700) < this.charakter.position_x) {
                endboss.watchedPlayer = true;
            }
        }
    }

    bossAttacksPlayer() {
        let endboss = this.level.enemies[this.level.enemies.length-1];
        let inter = setInterval(() => {
            if(endboss.attack && this.STATUS === "PLAY" && !endboss.dead) {
                if(this.charakter.position_x < endboss.position_x) {
                    endboss.otherDirection = false;
                    endboss.position_x -= 20;
                } else if(this.charakter.position_x > endboss.position_x) {
                    endboss.otherDirection = true;
                    endboss.position_x += 20;
                }
            }
        }, 100);
    }


    setWorld() {
        this.charakter.world = this;
    }

    drawStartScreen() {
        this.addToMap(this.startScreen)
    }

    drawWorld() {
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addToMap(this.charakter)

            this.addObjectsToMap(this.level.enemies);
            this.level.enemies.forEach((enemy) => {
                if(enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    this.addToMap(enemy.healthbar);
                } else if(enemy instanceof Endboss) {
                    enemy.healthbar.position_x = enemy.position_x;
                    enemy.healthbar.position_y = enemy.position_y + 0;
                    this.addToMap(enemy.healthbar);
                }
            });
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.throwableObjects)
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.healthbar);
            this.addToMap(this.coinbar);
            this.addToMap(this.bottlebar);
    }

    drawEndScreen() {
        this.addToMap(this.endScreen)
    }


    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)

        if(this.STATUS === "START") {
            this.drawStartScreen();
        }
        if(this.STATUS === "PLAY" || this.STATUS === "PAUSE") {
            this.drawWorld();
        }

        if(this.STATUS == "END") {
            this.drawWorld();
            this.drawEndScreen();
        }

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.position_x = mo.position_x * -1;
    }

    flipImageBack(mo) {
        mo.position_x = mo.position_x * -1
        this.ctx.restore();
    }

}