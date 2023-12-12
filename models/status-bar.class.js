class StatusBar extends DrawableObject{

    IMAGES = [];

    percentage = 100;
    position_x = 10;
    position_y = 0;
    width = 200;
    height = 60;

    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.position_x = 10;
        this.position_y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * 
     * @param {Number} percentage - setzt die Prozent anzeige.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Welches Bild als Bar angezeigt werden soll.
     * @returns index von dem geladenen Imagesarray.
     */
    resolveImageIndex() {
        if(this.percentage >= 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}