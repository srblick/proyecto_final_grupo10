import Phaser from "phaser";
import Button from "./Button"
class GameOver extends Phaser.Scene{
    boton = null;
    constructor(){
        super({key: 'gameOver'});
    }
    
    preload() {
        this.load.image('fondoGameOver','assets/gameOver.png');
    }

    create() {
        this.add.image(400, 300, 'fondoGameOver');
        this.botonReiniciar = new Button(this, 340, 455, 'button', 0, 1, 2, 'principal').setScale(0.6);    
        this.botonHome = new Button(this, 460, 455, 'home', 0, 1, 2, 'menu').setScale(0.6);    
        this.sound.add('audioMenu',{loop:true}).play();  
    }

    actionOnClick () {
        this.scene.start('principal');
    }
    
}

export default GameOver;