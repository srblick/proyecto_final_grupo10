export default class Player extends Phaser.Physics.Arcade.Sprite {
    lives; //vidas de player
    Trashed; //indica ji el player es golpeado
    bulletPower; // indica el poder de las armas
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); // creo el sprite
        this.scene = scene;
        this.scene.add.existing(this); // hace visible la imagen del Player
        this.scene.physics.world.enable(this); // activa body del Player
        this.setScale(0.6); // reduce el Tamaño
        this.setCollideWorldBounds(true); // para que no se salga de la pantalla
        this.lives = 3; 
        this.Trashed = false;
        this.bulletPower = 1;
        this.body.setCircle(35); //que el cuerpo de collision sea un circulo
    }
    /** deevuelve las vidas */
    getLives(){
        return this.lives;
    }
    /** agrega un vida */
    addLives(){
        this.lives++;
    }
    /** resta una vida, lo pone en estado golpeado y reinicia el poder de las balas*/
    subLives(){
        this.lives--;
        this.Trashed = true;
        this.bulletPower = 1;
        this.setPosition(400, 550);
    }
    /** get trashed */
    isTrashed(){
        return this.Trashed;
    }
    /** set trashed */
    setIsTrashed(trashed){
        this.Trashed = trashed;
    }

    /** agrega poder de la bala en uno, solo hasta 4 */
    addBulletPower(){
        if(this.bulletPower < 4){
            this.bulletPower++;
        }
    }
    /** reinicia bulletPower */
    initBulletPower(){
        this.bulletPower = 1;
    }
    /** reinicia todos los atributos del player */
    init(){
        this.lives = 3;
        this.Trashed = false;
        this.bulletPower = 1;
    }

    animatePlayer() {}

}

