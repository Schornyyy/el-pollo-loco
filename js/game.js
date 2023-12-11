let canvas;
let world;
let keyboard = new Keyboard();
let fullScreen = false;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard)

    document.getElementById("start").addEventListener("click", (e) => {
        world.setStatus("PLAY");
        document.getElementById("start").style = "display: none;"
        
    })

}

function enterFullScreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if(element.webkitFullscreen) {
        element.webkitFullscreen();
    }
 }

 function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
 }

window.addEventListener('keydown', (e) => {
    if(world.charakter.isDead()) return;

    if(e.keyCode == 70) {
        if(fullScreen) {
            exitFullscreen();
            fullScreen = false;
        } else {
            fullScreen = true;
            enterFullScreen(canvas);
        }
    }

    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
        if(world.STATUS === "PLAY") {
            world.charakter.lastJump = new Date().getTime();
        }
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }

    if(e.keyCode == 27) {
        keyboard.ESC = !keyboard.ESC;
        if(keyboard.ESC && world.STATUS === "PLAY") {
            world.setStatus("PAUSE");
            document.getElementById("pause").style = "display: flex";
            document.getElementById("continue").addEventListener("click", (e) => {
                world.setStatus("PLAY");
                document.getElementById("pause").style = "display: none";
            })
        } else {
            world.setStatus("PLAY")
            document.getElementById("pause").style = "display: none";
        }
    }
})

window.addEventListener('keyup', (e) => {
    if(world.charakter.isDead()) return;
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
})