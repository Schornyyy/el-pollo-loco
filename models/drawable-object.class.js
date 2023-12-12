class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    position_x = 120;
    position_y = 280;
    height = 150;
    width = 100;


    /**
     * 
     * @param {ImagePath} path - der Path con dem Image was geladen werden soll. 
     */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;
    }

    
    /**
     * 
     * @param {Array} arr - Das Array von Images die animiert werden soll. 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; 
        });
    }

    /**
     * 
     * @param {Context} ctx - zeichnet das geladene Bild auf die angegebenen coordinaten auf den Context des Canvas. 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height)
    }


    /**
     * 
     * @param {Context} ctx - zeichnet ein Ramen um ausgewählte Elemente auf dem Canvas. 
     */
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