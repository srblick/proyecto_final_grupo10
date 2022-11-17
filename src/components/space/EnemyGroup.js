export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
    typeEnemies; // tipo de enemigo
    tag;
    constructor(scene) 
    {
        super(scene.physics.world, scene); //creo un grupo con el constructor de la superclase group
        /** datos de los enemigos */
        this.tag = 'nave';
        this.typeEnemies = [
            {
                "name":"enemy0",
                "lives": 1  
            },
            {
                "name":"enemy1",
                "lives": 1  
            },
            {
                "name":"enemy2",
                "lives": 2  
            },
            {
                "name":"enemy3",
                "lives": 2  
            },
            {
                "name":"enemy4",
                "lives": 2  
            },
            {
                "name":"enemy5",
                "lives": 3  
            },
            {
                "name":"enemy6",
                "lives": 3  
            },
            {
                "name":"enemy7",
                "lives": 3  
            },
            {
                "name":"enemy8",
                "lives": 4  
            },
            {
                "name":"enemy9",
                "lives": 4  
            },
            {
                "name":"enemy10",
                "lives": 5  
            },
            {
                "name":"enemy11",
                "lives": 5  
            }
        ];
    }
    /** agrega un enemigo al grupo */
    addEnemy(x, y, type)
    {
        let enemy = this.create(x, y, this.typeEnemies[type].name).setScale(0.6).setVisible(true).setActive(true);
//        enemy.setData('lives', this.typeEnemies[type].lives);
        enemy.lives = this.typeEnemies[type].lives;  //agrego el atributo vida al enemigo
        enemy.tag = this.tag;
        enemy.puntajeOtorgado = this.typeEnemies[type].lives * 25;
        enemy.body.allowGravity = false; // desactivo la gravedad para que no afecte al enemigo
        return enemy;
    }
}