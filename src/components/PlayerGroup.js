export default class PlayerGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) 
    {
        super(scene.physics.world, scene);
        this.scene = scene;
    }

    addPlayer(x, y, image) 
    {
        let player = this.create(x , y - 30, image).setScale(0.5)
            .setActive(true)
            .setVisible(true)
            .setDepth(2); 
//        player.body.velocity.y = -300;
        player.body.allowGravity = false;
    }
}