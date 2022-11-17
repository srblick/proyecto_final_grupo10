import Phaser from "phaser";
import AsteroidGroup from "./AsteroidGroup";
import BulletGroup from "./BulletGroup";
import EnemyBulletGroup from "./EnemyBulletGroup";
import EnemyGroup from "./EnemyGroup";
import Player from "./Player";

class Principal extends Phaser.Scene{
    constructor(){
        super({key:'principal'});
    }
    player = null;
    score = 0;
    cursors = null;
    asteroidGroup = null;
    enemyGroup = null;
    bulletGroup = null;
    enemyBulletGroup = null;
    explodeGroup = null;
    velocidad = 250; // velocidad del player
    graphics;
    rutas = [];// rutas de las naves enemigas
    velocityEnemy = [22000,15000,15000,15000,15000,15000,15000,15000,14000,14000,14000,13000];
    textScore;
    textRound;
    textLives;

    // disparo de enemigos
    enemyShotSpeed = 1000; // cada cuanto tiempo se va a disparar
    enemyShotTime = 1000; // indica si es tiempo de disparar

    enemySpawnSpeed = 400; // velocidad de generacion de enemigos
    enemySpawnTime = 0; // indica si es tiempo de generar enemigo
    enemyForRound = 30; // controla cuantos enemigos se generan por round
    enemyDeads = 0; // enemigos que mata el jugador
    enemyCount = 0; // cuenta los enemigos que se generan
    round = 0; // cuando inicia el round
    roundTotal = 12;

    asteroidSpawnSpeed = 5000; // velocidad de generacion de asteroide
    asteroidSpawnTime = 0; // indica si es tiempo de generar asteroide

    preload ()
    {
        this.load.path = './assets/';
        this.load.image('nave0', 'nave0.png');
        this.load.image('nave1', 'nave1.png');
        this.load.image('nave2', 'nave2.png');
        this.load.image('nave3', 'nave3.png');
        this.load.image('enemy0', 'enemy0.png');
        this.load.image('enemy1', 'enemy1.png');
        this.load.image('enemy2', 'enemy2.png');
        this.load.image('enemy3', 'enemy3.png');
        this.load.image('enemy4', 'enemy4.png');
        this.load.image('enemy5', 'enemy5.png');
        this.load.image('enemy6', 'enemy6.png');
        this.load.image('enemy7', 'enemy7.png');
        this.load.image('enemy8', 'enemy8.png');
        this.load.image('enemy9', 'enemy9.png');
        this.load.image('enemy10', 'enemy10.png');
        this.load.image('enemy11', 'enemy11.png');
        this.load.image('asteroid0', 'asteroid0.png');
        this.load.image('asteroid1', 'asteroid1.png');
        this.load.image('asteroid2', 'asteroid2.png');
        this.load.image('misil', 'misil0.png');
        this.load.image('bala', 'bala.png');
        this.load.image('balaE', 'balaE.png');
        this.load.image('fondoGame', 'fondoGame.jpg');
        this.load.spritesheet('bala0', 'bala0.png', { frameWidth: 36, frameHeight: 56 });
        this.load.spritesheet('explode', 'explode.png', { frameWidth: 128, frameHeight: 128 });

        // Cargo sonidos
        this.load.audio('audioExplode','sonido/explosion.ogg');
        this.load.audio('audioShoot','sonido/fire.ogg');
        this.load.audio('audioGame','sonido/theme-music.ogg');

    }

    create ()
    {
        this.initGame();
        this.createPaths(); //crea rutas de los enemigos
        this.fondo = this.add.image(0,0,'fondoGame').setOrigin(0);
        this.tweens.add({
            targets: this.fondo,
            props:{
                x:{
                    value:-1200,
                    duration: 180000
                },
                y:{
                    value:-2200,
                    duration: 400000
                }
            },
            ease: 'Linear',
            repeat: -1
        });

        var particles = this.add.particles('bala');
        //Creo la animacion de la explocion
        this.anims.create({
            key: 'animExplode',
            frames: this.anims.generateFrameNumbers('explode', { start: 0, end: 15 }),
            frameRate: 30,
            repeat: 0, // repiste solo una vez.
            hideOnComplete: true  // desactiva el sprite cuando termina la nimacion
        })

        var emitter = particles.createEmitter({
            speed: 5,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 400, 550, 'nave0');

        //Grupo para agregar enemigos        
        this.enemyGroup = new EnemyGroup(this);
        //Grupo para agregar balas Player
        this.bulletGroup = new BulletGroup(this);
        //Grupo para agregar balas enemigo
        this.enemyBulletGroup = new EnemyBulletGroup(this);
        //Grupo para agregar asteroides
        this.asteroidGroup = new AsteroidGroup(this);
        //creo Grupo para las explociones
        this.explodeGroup = this.add.group({
            key:'explode', //el sprite que se usa
            repeat: 15,  // le indico que son 15 los elementos a crear
            setXY:{x: 0,y: 0}, // posicion
            visible: false, // que no se visible
            active: false,  // lo desactivo
            setScale: {x: 0.4, y: 0.4} //redusco el tamanio
        });
        this.sound.add('audioExplode',{loop:false}).setVolume(0.5);
        this.sound.add('audioShoot',{loop:false}).setVolume(0.5);
        this.sound.add('audioGame',{loop:true}).setVolume(0.5).play();

        // Comprueba si hay colisiones 
        this.physics.add.collider(this.bulletGroup, this.enemyGroup, this.deadEnemy, null, this);
        this.physics.add.collider(this.bulletGroup, this.asteroidGroup, this.deadEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemyBulletGroup, this.deadPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.deadPlayer, null, this);
        this.physics.add.overlap(this.player, this.asteroidGroup, this.deadPlayer, null, this);
        
        emitter.startFollow(this.player);

        //textos
        this.textScore = this.add.text(400, 20, "Score: "+this.score, { font: "bold 20pt Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.textRound = this.add.text(400, 300, "Round: "+(this.round + 1) , { font: "bold 70pt Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.textLives = this.add.text(750, 20, "vidas: "+this.player.lives , { font: "bold 14pt Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.delayTextRound();

    }
    
    update(time)
    {
        /** Mustra la ruta de los enemigos  
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff, 1);
        this.rutas[this.round].draw(this.graphics, 180);//*/
    

        //controles Izquierda y Derecha de la nave
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.velocidad);
        }else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.velocidad);
        }else{
            this.player.setVelocityX(0);
        }
        //mueve la nave Arriba y Abajo
        if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.velocidad);
        }else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.velocidad);
        }else{
            this.player.setVelocityY(0);
        }
        // Dispara bala con espacio
        if (this.input.keyboard.checkDown(this.cursors.space, 500)) {
            this.toShoot(this.player);
        }        

        this.createEnemy();
        this.updateEnemies(this.player);
        this.createAsteroid(this.player);
        this.destroyObject(this.bulletGroup);
        this.destroyObject(this.enemyBulletGroup);
        this.destroyObject(this.asteroidGroup);
        this.cambiarRound();
    }

    updateEnemies(player){
        let enemies = this.enemyGroup.getChildren();
        let aux= Phaser.Math.Between(0,enemies.length); // el enemigo que dispara
        for (let i = 0; i < enemies.length; i++)
        {
            let t = enemies[i].z;
            let vec = enemies[i].getData('vector');
            //  el vector es actualizado
            this.rutas[this.round].getPoint(t, vec);
            enemies[i].setPosition(vec.x, vec.y);
            if(this.time.now > this.enemyShotTime && aux == i)
            {   
                this.toShootEnemy(vec.x, vec.y, player);
            }
        }    
        if(this.player.isTrashed()){
            this.player.setTint(Phaser.Math.Between(0x0,0xffffff));
        }
    }

    toShoot(player)
    {
        //creamos una nueva bala en lugar del player
        this.sound.play('audioShoot');
        this.bulletGroup.addBullet(player.x, player.y); 
    }

    toShootEnemy(x, y, player)
    {
        let bullet = this.enemyBulletGroup.addBullet(x, y); 
        this.physics.moveToObject(bullet, player, 200);
        this.enemyShotTime = this.time.now + Phaser.Math.Between(this.enemyShotSpeed - 500, this.enemyShotSpeed + 500);
    }

    deadEnemy(bullet, enemy)
    {
        bullet.destroy();
        enemy.lives--;
        if(enemy.lives <= 0)
        {
            if(enemy.tag == 'nave'){
                this.enemyDeads++;
            }
            this.score += enemy.puntajeOtorgado;
            this.textScore.setText("Score: "+this.score);
            this.createExplode(enemy.x, enemy.y)
            enemy.destroy();
        }
    }
    
    deadPlayer(player, bullet)
    {
        if(bullet.tag == 'nave'){
            this.enemyDeads++;
        }
        if(!player.isTrashed())
        {
            bullet.destroy();
            if(player.getLives() == 0)
            {   
                this.sound.stopByKey('audioGame');
                this.createExplode(player.x, player.y);
                player.setVisible(false);
                this.textRound.setText("You LOSE").setVisible(true);
                this.changeScene('gameOver'); // cambiar de escena
            }
            else{
                this.createExplode(player.x, player.y);
                player.subLives(); //
                this.textLives.setText("vidas: "+player.lives);
                this.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        player.setIsTrashed(false);
                        player.clearTint();
                    }
                });    
            }
        }   
    }

    createExplode(x, y){
        this.explodeGroup.getFirstDead(true, x, y)
            .setActive(true)
            .setVisible(true).play('animExplode');
        this.sound.play('audioExplode');
        this.time.addEvent({
            delay:500,
            callback: () => {
                this.explodeGroup.getFirstAlive()
                    .setVisible(false)
                    .setActive(false);
            }
        });
    }

    createEnemy()
    {
        if(this.time.now > this.enemySpawnTime){
            this.enemyCount++;
            if(this.enemyCount <= this.enemyForRound){
                let enemy = this.enemyGroup.addEnemy(25,-10, this.round);
                enemy.setData('vector', new Phaser.Math.Vector2());
                this.tweens.add({
                    targets: enemy,
                    z: 1,
                    ease: 'Linear',
                    duration: this.velocityEnemy[this.round],
                    repeat: -1
                });
                this.enemySpawnTime = this.time.now + this.enemySpawnSpeed;
            }
        }
    }
    cambiarRound(){
        if(this.enemyDeads >= this.enemyForRound){
            this.enemyShotSpeed -= 20; // cada cuanto tiempo se va a disparar
            this.enemySpawnSpeed -= 5; // velocidad de generacion de enemigos
            this.asteroidSpawnSpeed -= 50; // velocidad de generacion de asteroide
            this.enemyCount = 0; 
            this.enemyDeads = 0;
            this.round++; 
            if(this.round == this.roundTotal){
                this.textRound.setText("You WIN").setVisible(true);
                this.changeScene('winner'); // cambiar de escena
            }else{
                this.textRound.setText("Round: "+(this.round+1)).setVisible(true);
                this.delayTextRound();
            }
        }
    }
    //muestra 3 segundos el cartel del round
    delayTextRound(){
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.textRound.setVisible(false);
            }
        });
    }
    changeScene(escena){
        this.time.addEvent({
            delay:1000,
            callback: () => {
                this.scene.start(escena); 
            }
        })
    }
    /** */
    createAsteroid(player)
    {
        if(this.time.now > this.asteroidSpawnTime){
            let asteroid = this.asteroidGroup.addAsteroid(25,-10, 0);
            this.tweens.add({
                targets: asteroid,
                angle: 360,
                ease: 'Linear',
                duration: 10000,
                repeat: -1,
            });
            this.physics.moveToObject(asteroid, player, 
                Phaser.Math.Between(20,90));
            this.asteroidSpawnTime = this.time.now + Phaser.Math.Between(this.asteroidSpawnSpeed-2000,this.asteroidSpawnSpeed+2000);
        }
    }
    
    //inicializa las variables del juego
    initGame(){
        this.enemyShotSpeed = 1000; // cada cuanto tiempo se va a disparar
        this.enemySpawnSpeed = 400; // velocidad de generacion de enemigos
        this.asteroidSpawnSpeed = 5000; // velocidad de generacion de asteroide
        this.enemyDeads = 0;
        this.enemyCount = 0; 
        this.round = 0; 
        this.score = 0;
    }
    /** destruye balas y asteroides que salen del canvas */
    destroyObject(grupo)
    {
        let elements = grupo.getChildren();
        for (let i = elements.length - 1; i >= 0 ; i--)
        {  
            let element = elements[i];
            if(element.body.y < -100 || element.body.y > 650)
            {
                element.destroy();
            }
        }
    }
    createPaths()
    {
        this.graphics = this.add.graphics();    
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 100, 71, 703, 39, 711, 99, 92, 113, 104, 181, 712, 149, 721, 201, 92, 221, 95, 286, 707, 243, 720, 316, 92, 332, 114, 411, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 100, 71, 703, 39, 711, 99, 244, 116, 244, 194, 712, 149, 721, 201, 401, 220, 420, 286, 707, 243, 720, 316, 491, 333, 556, 396, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 183, 79, 32, 169, 48, 314, 244, 116, 628, 21, 751, 110, 678, 212, 354, 41, 298, 182, 552, 187, 572, 333, 237, 261, 298, 333, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 56, 228, 193, 356, 602, 375, 756, 240, 726, 86, 415, 22, 154, 81, 206, 262, 592, 288, 645, 125, 300, 107, 281, 192, 571, 190, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 65, 353, 113, 36, 188, 352, 222, 43, 290, 352, 345, 36, 371, 353, 440, 42, 477, 359, 553, 38, 600, 359, 634, 40, 721, 364, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 65, 353, 113, 36, 440, 340, 222, 43, 139, 349, 345, 36, 642, 337, 440, 42, 273, 339, 553, 38, 749, 345, 650, 29, 485, 338, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 100, 71, 36, 277, 154, 371, 166, 203, 363, 293, 275, 69, 93, 137, 236, 319, 501, 363, 380, 101, 219, 174, 491, 232, 739, 354, 621, 53, 448, 119, 629, 254, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 25, 129, 60, 306, 253, 379, 670, 361, 779, 181, 627, 44, 140, 62, 26, 216, 163, 358, 609, 369, 751, 273, 697, 68, 421, 34, 98, 81, 99, 337, 698, 346, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 25, 129, 61, 318, 225, 382, 397, 264, 311, 55, 101, 64, 23, 277, 251, 387, 406, 256, 572, 381, 751, 273, 734, 69, 479, 56, 407, 237, 539, 372, 759, 289, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 25, 129, 49, 542, 179, 363, 446, 171, 226, 54, 116, 192, 286, 289, 400, 530, 406, 256, 613, 411, 717, 155, 490, 38, 237, 136, 619, 322, 735, 558, 758, 129, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 25, 129, 361, 206, 734, 514, 653, 250, 662, 45, 368, 136, 62, 50, 50, 520, 186, 199, 543, 433, 488, 232, 490, 38, 275, 159, 455, 215, 282, 433, 673, 193, 718, -10]));
        this.rutas.push(new Phaser.Curves.Spline([200, -10, 31, 419, 126, 490, 265, 147, 199, 139, 95, 338, 83, 479, 229, 356, 257, 411, 313, 345, 342, 460, 435, 152, 333, 285, 429, 343, 414, 408, 474, 418, 491, 339, 420, 488, 522, 392, 558, 448, 609, 371, 615, 453, 724, 264, 183, 199, 311, 254, 780, 281, 718, -10]));
}

}
export default Principal;