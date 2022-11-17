import Phaser from "phaser";
import Button from "./Button"

class Winner extends Phaser.Scene{
    constructor(){
        super({key: 'winner'}); // le asigno la key a la escena
    }
    
    preload() {
        this.load.image('fondoWinner','assets/winner.png'); // cargo el archivo del fondo
    }

    create() {
        this.add.image(400, 300, 'fondoWinner'); //agrego el fondo a la escena
        this.botonReiniciar = new Button(this, 340, 455, 'button', 0, 1, 2, 'principal').setScale(0.6);    
        this.botonHome = new Button(this, 460, 455, 'home', 0, 1, 2, 'menu').setScale(0.6);    
        this.sound.add('audioMenu',{loop:true}).play();  
    }
}

export default Winner;