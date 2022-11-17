import Phaser from "phaser";
import Button from "./Button"

class Menu extends Phaser.Scene{
    constructor(){
        super({key: 'menu'}); // le asigno la key a la escena
    }
    
    preload() {
        this.load.image('fondoMenu','assets/menu.png'); // cargo el archivo del fondo
        /** Cargo los sprites de los botones */
        this.load.spritesheet('start', 'assets/botones/button-continue.png',{
            frameWidth: 180,
            frameHeight: 180
        });
        this.load.spritesheet('button', 'assets/botones/button-restart.png',{
            frameWidth: 180,
            frameHeight: 180
        });
        this.load.spritesheet('home', 'assets/botones/button-mainmenu.png',{
            frameWidth: 180,
            frameHeight: 180
        });
        // se cargan audios
        this.load.audio('click','assets/sonido/button-click.ogg');
        this.load.audio('audioMenu','assets/sonido/menu.ogg');
        
    }   

    create() {
        this.add.image(400, 300, 'fondoMenu'); //agrego el fondo a la escena
        this.botonStart = new Button(this, 400, 460, 'start', 0, 1, 2, 'principal').setScale(0.6);  
        this.sound.add('audioMenu',{loop:true}).play();  
    }
}

export default Menu;