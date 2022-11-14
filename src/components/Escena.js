import Phaser from "phaser";
import BulletGroup from "./BulletGroup";
import EnemyBulletGroup from "./EnemyBulletGroup";
import EnemyGroup from "./EnemyGroup";
import Player from "./Player";
import PlayerGroup from "./PlayerGroup";

class Escena extends Phaser.Scene{
    player = null;
    cursors = null;
    asteroid = null;
    enemyGroup = null;
    bulletGroup = null;
    enemyBulletGroup = null;
    velocidad = 250;
    graphics;
    rutas = [];
    fireEnemyTimer = 1000;


    preload ()
    {
    //    this.load.path = './assets/';
        this.load.image('nave0', './assets/nave0.png');
        this.load.image('nave1', './assets/nave1.png');
        this.load.image('nave2', './assets/nave2.png');
        this.load.image('nave3', './assets/nave3.png');
        this.load.image('enemy0', './assets/enemy0.png');
        this.load.image('enemy1', './assets/enemy1.png');
        this.load.image('enemy2', './assets/enemy2.png');
        this.load.image('enemy3', './assets/enemy3.png');
        this.load.image('enemy4', './assets/enemy4.png');
        this.load.image('enemy5', './assets/enemy5.png');
        this.load.image('enemy6', './assets/enemy6.png');
        this.load.image('enemy7', './assets/enemy7.png');
        this.load.image('enemy8', './assets/enemy8.png');
        this.load.image('enemy9', './assets/enemy9.png');
        this.load.image('enemy10', './assets/enemy10.png');
        this.load.image('enemy11', './assets/enemy11.png');
        this.load.image('asteroid', './assets/asteroid0.png');
        this.load.image('misil', './assets/misil0.png');
        this.load.image('bala', './assets/bala.png');
        this.load.image('balaE', './assets/balaE.png');
        this.load.spritesheet('bala0', './assets/bala0.png', { frameWidth: 36, frameHeight: 56 });
    }

    create ()
    {
        this.createPaths(); //crea rutas de los enemigos
        // crea animacion de las balas
        this.anims.create({
            key: 'animaBala',
            frames: this.anims.generateFrameNumbers('bala0', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        var particles = this.add.particles('bala');
        this.asteroid = this.add.image(100, 45, 'asteroid');

        var emitter = particles.createEmitter({
            speed: 10,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(400, 100, 'nave0').setScale(0.6);//.setImmovable();
        this.player.body.allowGravity = false;
        this.player.lives = 3;
        this.player.isTrashed = false;
//        this.player.setData('lives', 3);

        //Grupo para agregar enemigos        
        this.enemyGroup = new EnemyGroup(this);
        //Grupo para agregar balas
        this.bulletGroup = new BulletGroup(this);
        //Grupo para agregar balas enemigo
        this.enemyBulletGroup = new EnemyBulletGroup(this);

        // Comprueba si hay colisiones 
        this.physics.add.collider(this.bulletGroup, this.enemyGroup, this.deadEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemyBulletGroup, this.deadPlayer, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.deadPlayer, null, this);
    
    
        emitter.startFollow(this.player);

    }
    
    update(time)
    {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff, 1);
        this.rutas[0].draw(this.graphics, 180);
    

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

        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.toShoot(this.player);
            this.createEnemy();
        }        

        let enemies = this.enemyGroup.getChildren();
        let aux= Phaser.Math.Between(0,enemies.length);
        for (var i = 0; i < enemies.length; i++)
        {
            let t = enemies[i].z;
            let vec = enemies[i].getData('vector');
            //  el vector es actualizado
            this.rutas[0].getPoint(t, vec);
            enemies[i].setPosition(vec.x, vec.y);
            if(this.time.now > this.fireEnemyTimer && aux == i)
            {
                this.toShootEnemy(vec.x, vec.y, this.player);
            }
        }    
        if(this.player.isTrashed){
            this.player.setTint(Phaser.Math.Between(0x0,0xffffff));
        }
    }

    toShoot(player)
    {
        //creamos una nueva bala en lugar del player
        this.bulletGroup.addBullet(player.x, player.y); 
    }

    toShootEnemy(x, y, player)
    {

        let bullet = this.enemyBulletGroup.addBullet(x, y); 
        this.physics.moveToObject(bullet, player, 200);
        this.fireEnemyTimer = this.time.now + Phaser.Math.Between(500,1500);
    }

    deadEnemy(bullet, enemy)
    {
            bullet.destroy();
            if(enemy.data.values.lives <= 0)
            {
                enemy.destroy();
            }else
            {
                enemy.data.values.lives--;
            }
    }
    
    deadPlayer(player, bullet)
    {
        if(!this.player.isTrashed)
        {
            this.player.isTrashed = true;

            bullet.destroy();
            if(this.player.lives == 0)
            {   
                player.destroy();// cambiar de escena 
            }else
            {
                this.player.lives--;
                console.log(this.player.lives);
                this.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        this.player.isTrashed = false;
                        player.clearTint();
                    }
                });    
            }
        }   
    }

    createEnemy()
    {
        let enemy = this.enemyGroup.addEnemy(25,-10, 0);
        enemy.setData('vector', new Phaser.Math.Vector2());
        this.tweens.add({
            targets: enemy,
            z: 1,
            ease: 'Linear',
            duration: 22000,
            repeat: -1
        });
    }
    createPaths()
    {
        this.graphics = this.add.graphics();    
        this.rutas.push(new Phaser.Curves.Spline([25, -10, 100, 71, 703, 39, 711, 99, 92, 113, 104, 181, 712, 149, 721, 201, 92, 221, 95, 286, 707, 243, 720, 316, 92, 332, 114, 411, 718, -10]));
    }

}
export default Escena;