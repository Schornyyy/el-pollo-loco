class MoveableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    isJumping = false;
    energy = 100;
    lastHit = 0;
    isPlaying = false;
    healthbar = new Healthbar();

    /**
     * Das Object bekommt Grafitation.
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
                this.isJumping = true;
            } else {
                this.isJumping = false;
            }
        }, 1000 / 25)
    }

    /**
     * 
     * @returns ob der Object in der Luft ist also über 150 in den Coordinaten X.
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) return true;
        return this.position_y < 150;
    }


    /**
     * Das Object bewergt sich nach links.
     */
    moveLeft() {
        if(this.isPlaying) {
            this.healthbar.position_x = this.position_x;
            this.healthbar.position_y = this.position_y - 50;
            this.healthbar.width = this.width;
            this.healthbar.height = 50;
            this.position_x -= this.speed;
        }
    }

    /**
     * 
     * @param {Array} images - welche Images animiert werden sollen.
     */
    playAnimation(images) {
        if(this.isPlaying) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Lässt das Object springen
     */
    jump() {
        this.speedY = 20;
        this.isJumping = true;
    }

    /**
     * Das Object bewergt sich nach rechts.
     */
    moveRight() {
        this.position_x += this.speed;
        this.otherDirection = false;
    }

    /**
     * 
     * @param {MoveableObject} mo - mit welchem Object collidiert es? 
     * @returns true oder false.
     */
    isColliding(mo) {
        return this.position_x + this.width > mo.position_x 
        && this.position_y + this.height > mo.position_y
        && this.position_x < mo.position_x
        && this.position_y < mo.position_y + mo.height;
    }

    /**
     * 
     * @param {MoveableObject} mo - auf welchenm Object soll gesprungen werden? 
     * @returns true oder false.
     */
    isJumpOn(mo) {
        return this.position_y < mo.position_y + mo.height; 
    }

    /**
     * Zieht das leben vom Object ab wenn er getroffen wurde.
     */
    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * 
     * @returns wurde er vor mehr als 1 sekunde verletzt?
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * 
     * @returns ist das Object tot = true;
     */
    isDead() {
        return this.energy == 0;
    }
}