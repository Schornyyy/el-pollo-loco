let canvas;
let world;
let keyboard = new Keyboard();
let fullScreen = false;

/**
 * Initialisiert alle notwendingen Funtionen.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard)

    document.getElementById("start").addEventListener("click", (e) => {
        world.setStatus("PLAY");
        document.getElementById("start").style = "display: none;"
        if (window.matchMedia("(orientation: landscape)").matches && window.innerHeight < 480) {
            document.getElementById("options").style = 'display: block';
            document.getElementById("movement").style = 'display: flex';
         }
        
    })

    document.getElementById("pause-restart").addEventListener("click", () => {
        world.level = createLevel();
        world.charakter.position_x = 0;
        world.charakter.energy = 100;
        world.setStatus("PLAY");
        clearKeyboard();
    })

    document.getElementById("mute").addEventListener("click", (e) => {
        world.muted = !world.muted;
    })

    document.addEventListener("contextmenu", function (e){
        e.preventDefault();
    }, false);

    handleMobileNav();
}


/**
 * Erstellt ein neues Level.
 */
function restart() {
    world.level = createLevel();
}

/**
 * Setzt den Canvas auf Fullscreen
 * @param {Canvas} element 
 */
function enterFullScreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if(element.webkitFullscreen) {
        element.webkitFullscreen();
    }
 }

 /**
  * Geht zurück in den normalen Window Mode.
  */
 function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
 }

 /**
  * Checkt welcher Button gedrückt wird
  */
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
            document.getElementById("continue").style = 'display: flex';
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

/**
 * Chekct welcher Button losgelassen wird.
 */
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

/**
 * Handelt alle Bewegung für Mobile.
 */
function handleMobileNav() {
 let mobile_up = document.getElementById("mobile-up");
 let mobile_left = document.getElementById("mobile-left");
 let mobile_right = document.getElementById("mobile-right");
 let throwBottle = document.getElementById("mobile-throw");
 let canvas = document.getElementById("canvas");
 let esc = document.getElementById("mobile-pause");

 const buttonKeyMappings = [
    { buttonId: 'mobile-left', keyProperty: 'LEFT' },
    { buttonId: 'mobile-right', keyProperty: 'RIGHT' },
    { buttonId: 'mobile-up', keyProperty: 'SPACE' },
    { buttonId: 'mobile-throw', keyProperty: 'D' }
];
 
buttonKeyMappings.forEach(mapping => {
    try {
        const buttonElement = document.getElementById(mapping.buttonId);
    // Mouse Events
    buttonElement.addEventListener('mousedown', () => keyboard[mapping.keyProperty] = true);
    buttonElement.addEventListener('mouseup', () => keyboard[mapping.keyProperty] = false);
    buttonElement.addEventListener('mouseleave', () => keyboard[mapping.keyProperty] = false);
    // Touch Events
    buttonElement.addEventListener('touchstart', (event) => {
        keyboard[mapping.keyProperty] = true;
    });
    buttonElement.addEventListener('touchend', (event) => {
        keyboard[mapping.keyProperty] = false;
    });
    } catch (error) {
        
    }
});

 esc.addEventListener('click', () => {
    keyboard.ESC = !keyboard.ESC;
        if(keyboard.ESC && world.STATUS === "PLAY") {
            world.setStatus("PAUSE");
            document.getElementById("pause").style = "display: flex";
            document.getElementById("continue").style = 'display: flex';
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