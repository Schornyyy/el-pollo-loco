class Level {
    enemies;
    clouds;
    backgroundObjects = [];
    level_end_x = 2200;
    coinsAmount;
    coins = [];

    constructor(enemies, clouds, backgroundObjects, coinsAmount) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coinsAmount = coinsAmount;
        this.loadCoins();
    }

    loadCoins() {
        let mapLenght = ((this.backgroundObjects.length * 719) / 5) - 200;
        for (let i = 0; i < this.coinsAmount; i++) {
            this.coins.push(new Coin(Math.random() * mapLenght))
        }
    }
}