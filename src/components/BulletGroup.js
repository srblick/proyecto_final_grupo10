export default class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) 
    {
        super(scene.physics.world, scene);
        this.scene = scene;
    }

    addBullet(x, y) 
    {
        let bullet = this.create(x , y - 30, 'bala').setScale(0.5)
            .setActive(true)
            .setVisible(true)
            .setDepth(2); 
        bullet.body.velocity.y = -300;
        bullet.body.allowGravity = false;
/*        bullet.anchor.setTo(0.5, 0.5);
        bullet.animations.add('fire', [ 0, 1, 2, 3 ], 20, true);
        bullet.play('fire');*/

        
//        bullet.outOfBoundsKill = true;
    }
}