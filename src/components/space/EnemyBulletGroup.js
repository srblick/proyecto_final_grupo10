export default class EnemyBulletGroup extends Phaser.Physics.Arcade.Group {
    tag;
    constructor(scene) 
    {
        super(scene.physics.world, scene); //creo un grupo con el constructor de la superclase group
        this.scene = scene; // agrego la escena al grupo
        this.tag = 'bala';
    }

    /** agrega una bala al grupo */
    addBullet(x, y) 
    {
        let bullet = this.create(x , y - 30, 'balaE').setScale(0.5)
            .setActive(true) // hago que sea activo
            .setVisible(true);// hago que sea visible
            //.setDepth(2); 
        bullet.body.velocity.y = 300; // velocidad de la bala
        bullet.body.allowGravity = false; // desactivo la gravedad para que no afecte a la bala
        bullet.tag = this.tag;
        bullet.puntajeOtorgado = 0;
        return bullet;
    }
}