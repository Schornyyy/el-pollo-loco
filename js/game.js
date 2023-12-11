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
        if (window.matchMedia("(orientation: landscape)").matches) {
            document.getElementById("options").style = 'display: block';
            document.getElementById("movement").style = 'display: flex';
         }
        
    })

    document.getElementById("pause-restart").addEventListener("click", () => {
        world.level = createLevel();
        world.charakter.position_x = 0;
        world.charakter.energy = 100;
        world.setStatus("PLAY");
    })

    handleMobileNav();
}

function restart() {
    world.level = createLevel();
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
        restart();
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

function handleMobileNav() {
 let mobile_up = document.getElementById("mobile-up");
 let mobile_left = document.getElementById("mobile-left");
 let mobile_right = document.getElementById("mobile-right");
 let throwBottle = document.getElementById("mobile-throw");
 let canvas = document.getElementById("canvas");
 let esc = document.getElementById("mobile-pause");
 
 mobile_up.addEventListener("click", (e) => {
    keyboard.SPACE = true;
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
 })

 mobile_left.addEventListener("click", (e) => {
    keyboard.LEFT = true;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
 })

 mobile_right.addEventListener("click", (e) => {
    keyboard.RIGHT = true;
    keyboard.LEFT = false;
    keyboard.SPACE = false;
 })

 throwBottle.addEventListener('click', () => {
    clearKeyboard();
    if(world.STATUS === "PLAY") {
        keyboard.D = true;
        
    setTimeout(() => {
        keyboard.D = false;
    }, 50)
    }
 })

 canvas.addEventListener("click", () => {
    clearKeyboard();
 })

 esc.addEventListener('click', () => {
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
 })
 
}

function clearKeyboard() {
    keyboard.SPACE = false;
    keyboard.DOWN = false;
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
}