export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
    typeEnemies;
    constructor(scene) 
    {
        super(scene.physics.world, scene);
        this.typeEnemies = [
            {
                "name":"enemy0",
                "lives": 2  
            },
            {
                "name":"enemy1",
                "lives": 1  
            },
            {
                "name":"enemy2",
                "lives": 1  
            },
            {
                "name":"enemy3",
                "lives": 1  
            }
        ];
    }

    addEnemy(x, y, type)
    {
        let enemy = this.create(x, y, this.typeEnemies[type].name).setScale(0.6).setVisible(true).setActive(true);
        enemy.setData('lives', this.typeEnemies[type].lives);
        enemy.body.allowGravity = false;
        return enemy;
    }
}