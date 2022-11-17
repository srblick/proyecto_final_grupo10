export default class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) 
    {
        super(scene.physics.world, scene); //creo un grupo con el constructor de la superclase group
        this.scene = scene; // agrego la escena al grupo
    }

    /** agrega una bala al grupo */
    addBullet(x, y) 
    {
        let bullet = this.create(x , y - 30, 'bala').setScale(0.5) //agrego una bala al grupo y lo escalo en 0.5 
            .setActive(true)    // hago que sea activo
            .setVisible(true);  // hago que sea visible
            //.setDepth(2); 
        bullet.body.velocity.y = -300;
        bullet.body.allowGravity = false; // desactivo la gravedad para que no afecte a la bala
    }
}