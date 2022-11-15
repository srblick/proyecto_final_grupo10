export default class Player extends Phaser.Physics.Arcade.Sprite {
    lives; //vidas de jugador
    Trashed; //indica ji el jugador es golpeado
    bulletPower; // indica el poder de las armas
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); //
        this.scene = scene;
        this.scene.add.existing(this); // hace visible la imagen del Player
        this.scene.physics.world.enable(this); // activa body del Player
        this.setScale(0.6); // reduce el Tamaño
        this.setCollideWorldBounds(true); // para que no se salga de la pantalla
        this.lives = 3;
        this.Trashed = false;
        this.bulletPower = 1;
    }

    getLives(){
        return this.lives;
    }
    addLives(){
        this.lives++;
    }
    subLives(){
        this.lives--;
    }

    isTrashed(){
        return this.Trashed;
    }

    setIsTrashed(trashed){
        this.Trashed = trashed;
    }

    addBulletPower(){
        this.bulletPower++;
    }

    initBulletPower(){
        this.bulletPower = 1;
    }

    init(){
        this.lives = 3;
        this.isTrashed = false;
        this.bulletPower = 1;
    }

    animatePlayer() {}

    update(){

    }
}

