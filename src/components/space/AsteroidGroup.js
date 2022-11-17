export default class AsteroidGroup extends Phaser.Physics.Arcade.Group {
    typeAsteroids;
    tag;
    constructor(scene) 
    {
        super(scene.physics.world, scene); //creo un grupo con el constructor de la superclase group
        /** datos de los asteroides */
        this.tag = 'asteroid';
        this.typeAsteroids = [
            {
                "name":"asteroid0",
                "lives": 1,
                "radio": 22,
                "xPos": 3
            },
            {
                "name":"asteroid1",
                "lives": 3,
                "radio": 39,
                "xPos": 10
            },
            {
                "name":"asteroid2",
                "lives": 2,
                "radio": 28,  
                "xPos": 5
            }
        ];
    }

    /** agrega un asteroide al grupo */
    addAsteroid()
    {
        let type = Phaser.Math.Between(0, this.typeAsteroids.length-1); // hace un ramdom para el tipo de asteroide
        let x = Phaser.Math.Between(-150, 950); // random para la posicion en la que va aparece el asteroide
        let asteroid = this.create(x, -50, this.typeAsteroids[type].name)
            .setScale(0.6) // escalo a 0.6
            .setVisible(true) // lo hago visible
            .setActive(true); // lo activo
        asteroid.lives = this.typeAsteroids[type].lives; //agrego el atributo vida al asteroides
        asteroid.tag = this.tag;
        asteroid.puntajeOtorgado = this.typeAsteroids[type].lives * 10;
        asteroid.body.allowGravity = false; // desactivo la gravedad para que no afecte al enemigo
        asteroid.body.setCircle(this.typeAsteroids[type].radio, this.typeAsteroids[type].xPos); //que el cuerpo de collision sea un circulo
        return asteroid;
    }
}