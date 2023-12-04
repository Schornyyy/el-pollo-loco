class Level {
    enemies;
    clouds;
    backgroundObjects = [];
    level_end_x = 2200;
    coinsAmount;
    bottleAmount;
    coins = [];

    constructor(enemies, clouds, backgroundObjects, coinsAmount, bottleAmount) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coinsAmount = coinsAmount;
        this.bottleAmount = bottleAmount;
        this.level_end_x = (backgroundObjects.length * 719 / 5) - 700;
        this.loadCoins();
        this.loadEndBoss();
    }

    loadCoins() {
        let mapLenght = ((this.backgroundObjects.length * 719) / 5) - 700;
        for (let i = 0; i < this.coinsAmount; i++) {
            this.coins.push(new Coin(Math.random() * mapLenght))
        }
    }

    loadEndBoss() {
        let endboss = this.enemies[this.enemies.length - 1]
        endboss.position_x = (this.backgroundObjects.length / 5) * 500 ;
    }
}