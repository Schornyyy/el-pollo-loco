class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    position_x = 120;
    position_y = 280;
    height = 150;
    width = 100;


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

    draw(ctx) {
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height)
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "Blue";
            ctx.rect(this.position_x,this.position_y,this.width,this.height)
            ctx.stroke();
        }
    }

}