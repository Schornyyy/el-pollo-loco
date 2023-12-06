class World {

    charakter = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthbar = new Healthbar();
    coinbar = new Coinbar();
    bottlebar = new BottleBar()
    throwableObjects = [];
    startScreen = new StartScreen(this);
    STATUS = "START";

    
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
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100)
    }

    setStatus(status) {
        switch (status) {
            case "START":
                document.getElementById("start").sytle = "display: none;";
                console.log(c);
                break;
            case "PAUSE":
                this.setAllToPause(this.level.enemies);
                this.setAllToPause(this.level.clouds);
                this.setAllToPause(this.level.coins);
                this.charakter.isPlaying = false;
                break;
            case "PLAY":
                this.setAllToPlaying(this.level.enemies);
                this.setAllToPlaying(this.level.clouds);
                this.setAllToPlaying(this.level.coins);
                this.charakter.isPlaying = true;
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
                        if(enemy.health > 0) {
                            bottle.colliding = true;
                            bottle.playSplashAnimation();
                            enemy.health -= bottle.damage;
                            enemy.healthbar.setPercentage(enemy.health);
                            setTimeout(() => {
                                this.throwableObjects.splice(bindex, 1);
                            }, 200);
                        }
                    }
                })
            })

        }
    }


    setWorld() {
        this.charakter.world = this;
    }


    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)

        if(this.STATUS === "START") {
            this.addToMap(this.startScreen)
        }
        if(this.STATUS === "PLAY" || this.STATUS === "PAUSE") {
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addToMap(this.charakter)

            this.addObjectsToMap(this.level.enemies);
            this.level.enemies.forEach((enemy) => {
                if(enemy instanceof Chicken || enemy instanceof Endboss) {
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
        mo.drawFrame(this.ctx)
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