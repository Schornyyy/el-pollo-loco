class Cloud extends MoveableObject{

    position_y = 20;
    height = 250;
    width = 500;
    speed = 0.15;


    constructor() {
        super().loadImage("../img/5_background/layers/4_clouds/1.png");

        this.position_x = Math.random() * 500
        this.animate();
    } 

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }

}