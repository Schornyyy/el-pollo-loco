class MoveableObject {
    position_x = 120;
    position_y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    isJumping = false;

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

    isAboveGround() {
        return this.position_y < 150;
    }

    loadImage(path) {
        this.img = new Image()
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; 
        });
    }

    moveLeft() {
        this.position_x -= this.speed;

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height)
        
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "Blue";
        ctx.rect(this.position_x,this.position_y,this.width,this.height)
        ctx.stroke();
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 20;
        this.isJumping = true;
    }

    moveRight() {
        this.position_x += this.speed;
        this.otherDirection = false;
    }
}