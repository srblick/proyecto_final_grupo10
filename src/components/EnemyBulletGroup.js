export default class EnemyBulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) 
    {
        super(scene.physics.world, scene);
        this.scene = scene;
    }

    addBullet(x, y) 
    {
        let bullet = this.create(x , y - 30, 'balaE').setScale(0.5)
            .setActive(true)
            .setVisible(true)
            .setDepth(2); 
        bullet.body.velocity.y = 300;
        bullet.body.allowGravity = false;
        return bullet;
    }
}